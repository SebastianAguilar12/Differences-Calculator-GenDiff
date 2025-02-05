import _ from 'lodash';

export default function plain(diffObject) {
  const iter = (element, parentPath = '') => {
    if (!_.isObject(element)) {
      return '';
    }
    const formatValue = (val) => {
      if (_.isObject(val) && val !== null) return '[complex value]';
      if (typeof val === 'string') return `'${val}'`;
      return `${val}`;
    };
    const processKey = (key, acc, processedPaths) => {
      const cleanKey = key.startsWith('+') || key.startsWith('-') ? key.slice(1).trim() : key;
      const path = parentPath ? `${parentPath}.${cleanKey}` : cleanKey;
      if (processedPaths.has(path)) {
        return acc;
      }
      const value = element[key];
      const keysArr = Object.keys(element);
      if (key.startsWith('-')) {
        const addKey = `+ ${cleanKey}`;
        if (keysArr.includes(addKey)) {
          const oldValue = value;
          const newValue = element[addKey];
          return [...acc, `Property '${path}' was updated. From ${formatValue(oldValue)} to ${formatValue(newValue)}`];
        }
        return [...acc, `Property '${path}' was removed`];
      }
      if (key.startsWith('+')) {
        if (!keysArr.includes(`- ${cleanKey}`)) {
          return [...acc, `Property '${path}' was added with value: ${formatValue(value)}`];
        }
        return acc;
      }
      if (_.isObject(value)) {
        const nestedResult = iter(value, path);
        return nestedResult ? [...acc, nestedResult] : acc;
      }
      return acc;
    };
    return Object.keys(element)
      .reduce((acc, key) => processKey(key, acc, new Set()), [])
      .filter(Boolean)
      .join('\n');
  };
  return iter(diffObject);
}
