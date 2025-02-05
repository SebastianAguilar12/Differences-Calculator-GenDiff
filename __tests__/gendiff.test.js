import path from 'node:path';
import gendiff from '../src/index.js';
import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';
import json from '../src/formatters/index.js';

test('testing indent .json files', () => {
  const indentFile1 = path.join(process.cwd(), '__fixtures__', 'file1.json');
  const indentFile2 = path.join(process.cwd(), '__fixtures__', 'file2.json');
  const indentFilesDiff = gendiff(indentFile1, indentFile2, stylish);
  const expectedIndent = {
    common: {
      '+ follow': false,
      setting1: 'Value 1',
      '- setting2': 200,
      '- setting3': true,
      '+ setting3': null,
      '+ setting4': 'blah blah',
      '+ setting5': {
        key5: 'value5',
      },
      setting6: {
        doge: {
          '- wow': '',
          '+ wow': 'so much',
        },
        key: 'value',
        '+ ops': 'vops',
      },
    },
    group1: {
      '- baz': 'bas',
      '+ baz': 'bars',
      foo: 'bar',
      '- nest': {
        key: 'value',
      },
      '+ nest': 'str',
    },
    '- group2': {
      abc: 12345,
      deep: {
        id: 45,
      },
    },
    '+ group3': {
      deep: {
        id: {
          number: 45,
        },
      },
      fee: 100500,
    },
  };
  expect(indentFilesDiff).toEqual(stylish(expectedIndent));
});
test('testing indent .yml files', () => {
  const indentYmlFile1 = path.join(process.cwd(), 'parsers', 'file1.yaml');
  const indentYmlFile2 = path.join(process.cwd(), 'parsers', 'file2.yaml');
  const indentYmlDiff = gendiff(indentYmlFile1, indentYmlFile2, stylish);
  const expectedIndent = {
    common: {
      '+ follow': false,
      setting1: 'Value 1',
      '- setting2': 200,
      '- setting3': true,
      '+ setting3': null,
      '+ setting4': 'blah blah',
      '+ setting5': {
        key5: 'value5',
      },
      setting6: {
        doge: {
          '- wow': '',
          '+ wow': 'so much',
        },
        key: 'value',
        '+ ops': 'vops',
      },
    },
    group1: {
      '- baz': 'bas',
      '+ baz': 'bars',
      foo: 'bar',
      '- nest': {
        key: 'value',
      },
      '+ nest': 'str',
    },
    '- group2': {
      abc: 12345,
      deep: {
        id: 45,
      },
    },
    '+ group3': {
      deep: {
        id: {
          number: 45,
        },
      },
      fee: 100500,
    },
  };
  expect(indentYmlDiff).toEqual(stylish(expectedIndent));
});
test('testing .json indent files with plain formatter', () => {
  const expectedResult = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;
  const indentFile1 = path.join(process.cwd(), '__fixtures__', 'file1.json');
  const indentFile2 = path.join(process.cwd(), '__fixtures__', 'file2.json');
  const indentComparision = gendiff(indentFile1, indentFile2, plain);
  console.log(typeof plain);
  expect(indentComparision).toBe(expectedResult);
});
test('testing .yml indent files with plain formatter', () => {
  const expectedResult = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;
  const indentYMLFile1 = path.join(process.cwd(), 'parsers', 'file1.yml');
  const indentYMLFile2 = path.join(process.cwd(), 'parsers', 'file2.yml');
  const indentComparision = gendiff(indentYMLFile1, indentYMLFile2, plain);
  expect(indentComparision).toBe(expectedResult);
});
test('test with json format', () => {
  const objectJSON = {
    common: {
      '+ follow': false,
      setting1: 'Value 1',
      '- setting2': 200,
      '- setting3': true,
      '+ setting3': null,
      '+ setting4': 'blah blah',
      '+ setting5': {
        key5: 'value5',
      },
      setting6: {
        doge: {
          '- wow': '',
          '+ wow': 'so much',
        },
        key: 'value',
        '+ ops': 'vops',
      },
    },
    group1: {
      '- baz': 'bas',
      '+ baz': 'bars',
      foo: 'bar',
      '- nest': {
        key: 'value',
      },
      '+ nest': 'str',
    },
    '- group2': {
      abc: 12345,
      deep: {
        id: 45,
      },
    },
    '+ group3': {
      deep: {
        id: {
          number: 45,
        },
      },
      fee: 100500,
    },
  };
  const file1 = path.join(process.cwd(), '__fixtures__', 'file1.json');
  const file2 = path.join(process.cwd(), '__fixtures__', 'file2.json');
  const twoFilesComparision = gendiff(file1, file2, json);
  expect(twoFilesComparision).toBe(json(objectJSON));
});
