import _ from 'lodash';
import {
  ROOT_VALUE,
  NESTED_VALUE,
  ADD_VALUE,
  DELETED_VALUE,
  UNCHANGED_VALUE,
  CHANGED_VALUE,
}
  from '../constants.js';

const getIndentation = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const formatValue = (data, depth, renderFunctions) => {
  if (!_.isObject(data)) return `${data}`;
  const entries = Object.entries(data).map(([key, value]) => {
    const unchangedValue = renderFunctions[UNCHANGED_VALUE]({ key, value }, depth + 1);
    return unchangedValue;
  });
  return `{\n${entries.join('\n')}\n${getIndentation(depth)}  }`;
};

const renderFunctions = {
  [ROOT_VALUE]: ({ children }, depth, iterate) => {
    const renderedChildren = children.flatMap((child) => iterate(child, depth + 1));
    return `{\n${renderedChildren.join('\n')}\n}`;
  },
  [NESTED_VALUE]: ({ key, children }, depth, iterate) => {
    const nestedChildren = children.flatMap((child) => iterate(child, depth + 1));
    return `${getIndentation(depth)}  ${key}: {\n${nestedChildren.join('\n')}\n${getIndentation(depth)}  }`;
  },
  [ADD_VALUE]: ({ key, value }, depth) => `${getIndentation(depth)}+ ${key}: ${formatValue(value, depth, renderFunctions)}`,
  [DELETED_VALUE]: ({ key, value }, depth) => `${getIndentation(depth)}- ${key}: ${formatValue(value, depth, renderFunctions)}`,
  [UNCHANGED_VALUE]: ({ key, value }, depth) => `${getIndentation(depth)}  ${key}: ${formatValue(value, depth, renderFunctions)}`,
  [CHANGED_VALUE]: ({ key, value1, value2 }, depth) => {
    const renderedValue1 = formatValue(value1, depth, renderFunctions);
    const renderedValue2 = formatValue(value2, depth, renderFunctions);
    return [
      `${getIndentation(depth)}- ${key}: ${renderedValue1}`,
      `${getIndentation(depth)}+ ${key}: ${renderedValue2}`,
    ].join('\n');
  },
};
const renderAST = (ast) => {
  const iterate = (node, depth) => renderFunctions[node.type](node, depth, iterate);
  return iterate(ast, 0);
};

export default renderAST;
