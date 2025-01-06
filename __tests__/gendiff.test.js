import gendiff from "../src/index.js";
import path from 'node:path';

test('gendiff with two .json extension files', () => {
  const file1 = path.join(process.cwd(), 'file1.json');
  const file2 = path.join(process.cwd(), 'file2.json');
  const comparision = gendiff(file1, file2);
  const expectedObject = {
    "- follow": false, 
    "host": "codica.io", 
    "- proxy": "123.234.53.22", 
    "- timeout": 50,
    "+ timeout": 20,
    "+ verbose": true
  };
  expect(comparision).toBe(JSON.stringify(expectedObject, null, 2));
});
