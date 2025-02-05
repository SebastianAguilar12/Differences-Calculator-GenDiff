import _ from 'lodash';

export default function stylish(value, reemplazador = ' ', spaces = 2, isMainObject = true, depthLevel = 1) {
  const keysArray = Object.keys(value);
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
      if (value && Array.isArray(value)) {
        const indent = `${reemplazador.repeat(spaces * depthLevel)}`;
        const formattedItems = value.map((item) => {
          if (_.isObject(item) && item !== null) {
            return stylish(item, reemplazador, spaces, false, depthLevel + 1);
          }
          return item;
        });
        return `[\n${formattedItems.map((item) => `${indent}  ${item}`).join('\n')}\n${indent}]`;
      }
      if (keysArray.length === 0) {
        return '{}';
      }
      return isMainObject
        ? `{\n${keysArray.reduce((acc, key, index) => {
          const curr = value[key];
          const isOb = _.isObject(curr);
          const currVal = isOb ? stylish(curr, reemplazador, spaces, false, depthLevel + 2) : curr;
          const indent = `${reemplazador.repeat(spaces * depthLevel)}`;
          const isDifference = key.startsWith('+') || key.startsWith('-');
          const separador = isDifference ? `${indent}${key}: ` : `${indent}  ${key}: `;
          return `${acc}${separador}${currVal}${index < keysArray.length - 1 ? '\n' : ''}`;
        }, '')}\n}`.trim()
        : `{\n${keysArray.reduce((acc, key, index) => {
          const curr = value[key];
          const isOb = _.isObject(curr);
          const currVal = isOb ? stylish(curr, reemplazador, spaces, false, depthLevel + 2) : curr;
          const indent = `${reemplazador.repeat(spaces * depthLevel)}`;
          const isDifference = key.startsWith('+') || key.startsWith('-');
          const separador = isDifference ? `${indent}${key}: ` : `${indent}  ${key}: `;
          return `${acc}${separador}${currVal}${index < keysArray.length - 1 ? '\n' : ''}`;
        }, '')}\n${reemplazador.repeat((spaces * depthLevel) - 2)}}`.trim();
    default:
      return 0;
  }
}
