import fs from 'node:fs';
import yaml from 'js-yaml';
import path from 'node:path';
import _ from 'lodash';

function analizeFile(pathFile) {
  try {
    const extensionFile = path.extname(pathFile);
    let readingFile;
    switch (extensionFile) {
      case ('.json'):
        readingFile = fs.readFileSync(pathFile, 'utf8');
        return JSON.parse(readingFile);
      case ('.yml'):
        readingFile = yaml.load(fs.readFileSync(pathFile, 'utf8'));
        return readingFile;
      case ('.yaml'):
        readingFile = yaml.load(fs.readFileSync(pathFile, 'utf8'));
        return readingFile;
      default:
        return null;
    }
  } catch (error) {
    console.error(error);
  }
  return null;
}

function stylish(value, reemplazador = ' ', spaces = 4, isMainObject = true, depthLevel = 1) {
  const keysArray = Object.keys(value);
  let result = '';
  if (value === null) {
    return 'null';
  }
  switch (typeof value) {
    case 'string':
      return value;
    case 'number':
      return `${value}`;
    case 'boolean':
      return value ? 'true' : 'false';
    case 'object':
      if (keysArray.length === 0) {
        return '{}';
      }
      result += keysArray.reduce((acc, key, index) => {
        const curr = value[key];
        const isOb = _.isObject(curr);
        const currVal = isOb ? stylish(curr, reemplazador, spaces, false, depthLevel + 1) : curr;
        const indent = `${reemplazador.repeat(spaces * depthLevel)}`;
        const isDifference = key.startsWith('+') || key.startsWith('-');
        const separador = isDifference ? `${indent}${key}: ` : `${indent}  ${key}: `;
        let newAcc = `${acc}${separador}${currVal}`;
        if (index < keysArray.length - 1) {
          newAcc = `${newAcc}\n`;
        }
        return newAcc;
      }, '');
      return isMainObject ? `{\n${result}\n}`.trim() : `{\n${result}\n${reemplazador.repeat((spaces * depthLevel) - 2)}}`.trim();
    default:
      return 0;
  }
}

function diff(file1, file2) {
  if (file1 && file2) {
    const keysFileOne = Object.keys(file1);
    const keysFileTwo = Object.keys(file2);
    const unionKeys = _.union(keysFileOne, keysFileTwo).sort();
    const result = unionKeys.reduce((acc, key) => {
      const key1 = `- ${key}`;
      const key2 = `+ ${key}`;
      if (_.isObject(file1[key]) && _.isObject(file2[key])) {
        acc[key] = diff(file1[key], file2[key]);
        return acc;
      }
      if (file1[key] === file2[key]) {
        acc[key] = file1[key];
        return acc;
      }
      if (file1[key] !== undefined) {
        acc[key1] = file1[key];
      }
      if (file2[key] !== undefined) {
        acc[key2] = file2[key];
      }
      return acc;
    }, {});
    return result;
  }
  return 0;
}

export {
  analizeFile,
  stylish,
  diff,
};
