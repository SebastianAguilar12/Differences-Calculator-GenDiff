import _ from 'lodash';

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

function buildPath(key, parentPath = '') {
  let newKey = key;
  if (_.startsWith(key, '+') || _.startsWith(key, '-')) {
    const [, extractedKey] = _.split(key, ' ', 2);
    newKey = extractedKey;
  }
  return parentPath ? `${parentPath}.${newKey}` : newKey;
}

function plain(diffObject) {
  const iter = (object, parentPath = '') => {
    const result = [];
    const entriesArr = Object.entries(object);
    for (let index = 0; index < entriesArr.length; index += 1) {
      const [currKey, currValue] = entriesArr[index];
      const nextKey = entriesArr[index + 1] ? entriesArr[index + 1][0] : null;
      const nextValue = entriesArr[index + 1] ? entriesArr[index + 1][1] : null;
      const currentPath = buildPath(currKey, parentPath);
      const nextPath = buildPath(nextKey, parentPath);
      if (currValue && _.isObject(currValue) && !Array.isArray(currValue)) {
        const recursive = iter(currValue, currentPath);
        result.push(recursive);
      }
      if (currentPath === nextPath) {
        let newValue = '';
        if (nextValue && _.isObject(nextValue)) {
          newValue = '[complex value]';
        } else if (nextValue === true || nextValue === false || nextValue === null) {
          newValue = `${nextValue}`;
        } else {
          newValue = `'${nextValue}'`;
        }
        let oldValue = '';
        if (currValue && _.isObject(currValue)) {
          oldValue = '[complex value]';
        } else if (currValue === true || currValue === false || currValue === null) {
          oldValue = `${currValue}`;
        } else {
          oldValue = `'${currValue}'`;
        }
        result.push(`Property '${currentPath}' was updated. From ${oldValue} to ${newValue}`);
        index += 1;
      } else {
        if (_.startsWith(currKey, '+')) {
          let newValue = '';
          if (currValue && _.isObject(currValue)) {
            newValue = '[complex value]';
          } else if (currValue === true || currValue === false || currValue === null) {
            newValue = `${currValue}`;
          } else {
            newValue = `'${currValue}'`;
          }
          result.push(`Property '${currentPath}' was added with value: ${newValue}`);
        }
        if (_.startsWith(currKey, '-')) {
          result.push(`Property '${currentPath}' was removed`);
        }
      }
    }
    return result.filter(Boolean).join('\n');
  };
  return iter(diffObject);
}

export {
  stylish,
  plain,
};
