import path from 'node:path';
import gendiff from '../src/index.js';
import analyzeFile from '../src/utils.js';

const normalizeLineEndings = (str) => str.replace(/\r\n/g, '\n');

test('testing indent .json files', () => {
  const indentFile1 = path.join(process.cwd(), '__fixtures__', 'file1.json');
  const indentFile2 = path.join(process.cwd(), '__fixtures__', 'file2.json');
  const indentFilesDiff = gendiff(indentFile1, indentFile2).trim();
  const expectedIndent = analyzeFile(path.join(process.cwd(), '__fixtures__', 'stylish-result.txt')).trim();
  console.log(typeof expectedIndent);
  console.log(typeof indentFilesDiff);
  expect(indentFilesDiff).toBe(normalizeLineEndings(expectedIndent));
});
test('testing indent .yml files', () => {
  const indentYmlFile1 = path.join(process.cwd(), '__fixtures__', 'file1-y.yaml');
  const indentYmlFile2 = path.join(process.cwd(), '__fixtures__', 'file2-y.yaml');
  const indentYmlDiff = gendiff(indentYmlFile1, indentYmlFile2, 'stylish').trim();
  const expectedIndent = analyzeFile(path.join(process.cwd(), '__fixtures__', 'stylish-result.txt')).trim();
  expect(indentYmlDiff).toBe(normalizeLineEndings(expectedIndent));
});
test('testing .json indent files with plain formatter', () => {
  const expectedResult = analyzeFile(path.join(process.cwd(), '__fixtures__', 'plain-result.txt')).trim();
  const indentFile1 = path.join(process.cwd(), '__fixtures__', 'file1.json');
  const indentFile2 = path.join(process.cwd(), '__fixtures__', 'file2.json');
  const indentComparision = gendiff(indentFile1, indentFile2, 'plain').trim();
  expect(indentComparision).toEqual(normalizeLineEndings(expectedResult));
});
test('testing .yml indent files with plain formatter', () => {
  const expectedResult = analyzeFile(path.join(process.cwd(), '__fixtures__', 'plain-result.txt')).trim();
  const indentYMLFile1 = path.join(process.cwd(), '__fixtures__', 'file1-y.yaml');
  const indentYMLFile2 = path.join(process.cwd(), '__fixtures__', 'file2-y.yaml');
  const indentComparision = gendiff(indentYMLFile1, indentYMLFile2, 'plain').trim();
  expect(indentComparision).toEqual(normalizeLineEndings(expectedResult));
});
test('test .json files with json format', () => {
  const objectJSON = analyzeFile(path.join(process.cwd(), '__fixtures__', 'json-result.json'));
  const file1 = path.join(process.cwd(), '__fixtures__', 'file1.json');
  const file2 = path.join(process.cwd(), '__fixtures__', 'file2.json');
  const twoFilesComparision = gendiff(file1, file2, 'json');
  expect(twoFilesComparision).toStrictEqual(JSON.stringify(objectJSON));
});
test('test .yml files with json format', () => {
  const objectYML = analyzeFile(path.join(process.cwd(), '__fixtures__', 'json-result.json'));
  const file1 = path.join(process.cwd(), '__fixtures__', 'file1-y.yaml');
  const file2 = path.join(process.cwd(), '__fixtures__', 'file2-y.yaml');
  const twoFilesComparision = gendiff(file1, file2, 'json');
  console.log(typeof objectYML);
  expect(twoFilesComparision).toStrictEqual(JSON.stringify(objectYML));
});
