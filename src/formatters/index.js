export default function json(object) {
  const children = object.children || [];
  const type = object.type || '';
  return { children, type };
}
