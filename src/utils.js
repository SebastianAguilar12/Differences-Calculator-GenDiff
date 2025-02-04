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
  diff,
};
