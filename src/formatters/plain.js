import _ from 'lodash';
import {
  ROOT_VALUE,
  NESTED_VALUE,
  ADD_VALUE,
  DELETED_VALUE,
  CHANGED_VALUE,
  UNCHANGED_VALUE,
}
  from '../constants.js';

const makeKeyPath = (key, parentKey = '') => {
  if (!parentKey) return `${key}`;
  return `${parentKey}.${key}`;
};

const makeString = (value) => {
  if (_.isString(value)) return `'${value}'`;
  return `${value}`;
};

const renderFunctions = {
  [ROOT_VALUE]: ({ children }, parentKey, formatPath) => {
    const formattedChildren = children.flatMap((child) => formatPath(child, parentKey, formatPath));
    return `${formattedChildren.join('\n')}`.trim();
  },
  [NESTED_VALUE]: ({ key, children }, parentKey, formatPath) => {
    const keyPath = makeKeyPath(key, parentKey);
    const formattedChildren = children.flatMap((child) => formatPath(child, keyPath, formatPath));
    return `${formattedChildren.join('\n')}`.trim();
  },
  [ADD_VALUE]: ({ key, value }, parentKey) => {
    const keyPath = makeKeyPath(key, parentKey);
    const formattedValue = _.isObject(value) ? '[complex value]' : makeString(value);
    return `Property '${keyPath}' was added with value: ${formattedValue}`.trim();
  },
  [DELETED_VALUE]: ({ key }, parentKey) => {
    const keyPath = makeKeyPath(key, parentKey);
    return `Property '${keyPath}' was removed`.trim();
  },
  [CHANGED_VALUE]: ({ key, value1, value2 }, parentKey) => {
    const keyPath = makeKeyPath(key, parentKey);
    const formattedValue1 = value1 && _.isObject(value1) ? '[complex value]' : makeString(value1);
    const formattedValue2 = value2 && _.isObject(value2) ? '[complex value]' : makeString(value2);
    return `Property '${keyPath}' was updated. From ${formattedValue1} to ${formattedValue2}`.trim();
  },
  [UNCHANGED_VALUE]: () => [],
};

export default function plain(ast) {
  const formatPath = (node, parentKey, pathFormat) => {
    const formattedNode = renderFunctions[node.type](node, parentKey, pathFormat);
    return Array.isArray(formattedNode) ? formattedNode : [formattedNode];
  };
  return formatPath(ast, '', formatPath).join('\n');
}
