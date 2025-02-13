import _ from 'lodash';

export default function json(object) {
  const {
    children,
    key,
    type,
    value,
    value1,
    value2,
  } = object;
  if (children) {
    const updatedChildren = children.map((child) => {
      if (typeof child === 'string') {
        return { type: 'text', value: child };
      }
      if (_.isObject(child) && Array.isArray(child)) {
        return json(child);
      }
      return child;
    });
    const resultObject = JSON.stringify({
      key,
      type,
      value,
      value1,
      value2,
      children: updatedChildren,
    }, null, 0);
    const cleanedResultObject = resultObject.replace(/\\"/g, '"');
    return cleanedResultObject;
  }
  return {
    key,
    type,
    value,
    value1,
    value2,
  };
}
