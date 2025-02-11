import _ from 'lodash';

export default function json(object) {
  const { children, type } = object;
  if (children) {
    children.forEach((child, index) => {
      if (typeof child === 'string') {
        children[index] = { type: 'text', value: child };
      } else if (_.isObject(child) && Array.isArray(child)) {
        children[index] = json(child);
      }
    });
    return { children, type };
  }
  return { type };
}
