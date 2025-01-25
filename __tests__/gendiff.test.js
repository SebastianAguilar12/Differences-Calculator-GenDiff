import path from 'node:path';
import { describe } from 'node:test';
import gendiff from '../src/index.js';
import * as functions from '../src/utils.js';

test('gendiff with two .json extension files', () => {
  const file1 = path.join(process.cwd(), '__fixtures__', 'file1.json');
  const file2 = path.join(process.cwd(), '__fixtures__', 'file2.json');
  const file3 = path.join(process.cwd(), '__fixtures__', 'file3.json');
  const file4 = path.join(process.cwd(), '__fixtures__', 'file4.json');
  const comparision1 = gendiff(file1, file2);
  const comparision2 = gendiff(file3, file4);
  const expectedObject1 = {
    '- follow': false,
    host: 'codica.io',
    '- proxy': '123.234.53.22',
    '- timeout': 50,
    '+ timeout': 20,
    '+ verbose': true,
  };
  const expectedObject2 = {
    '- ciudad': 'Bogotá',
    '- color': 'Naranja',
    '+ color-ojos': 'verde',
    '+ dirección': 'Madelena 4 Casa 17',
    edad: 26,
    '- nombre': 'Sebastian',
    '+ nombre': 'María Fernanda',
  };
  expect(comparision1).toBe(functions.stylish(expectedObject1));
  expect(comparision2).toBe(functions.stylish(expectedObject2));
});

test('gendiff with two .yml extension files', () => {
  const ymlFile1 = path.join(process.cwd(), 'parsers', 'ymlfile1.yml');
  const ymlFile2 = path.join(process.cwd(), 'parsers', 'ymlfile2.yml');
  const ymlComparision1 = gendiff(ymlFile1, ymlFile2);
  const expectedYml = {
    '- follow': false,
    host: 'codica.io',
    '- proxy': '123.234.53.22',
    '- timeout': 50,
    '+ timeout': 20,
    '+ verbose': true,
  };
  expect(ymlComparision1).toEqual(functions.stylish(expectedYml));
});

describe('test indent files', () => {
  test('testing indent .json files', () => {
    const indentFile1 = path.join(process.cwd(), '__fixtures__', 'indentFile1.json');
    const indentFile2 = path.join(process.cwd(), '__fixtures__', 'indentFile2.json');
    const indentFilesDiff = gendiff(indentFile1, indentFile2);
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
    expect(indentFilesDiff).toEqual(functions.stylish(expectedIndent));
  });
  test('testing indent .yml files', () => {
    const indentYmlFile1 = path.join(process.cwd(), 'parsers', 'indentFile1.yaml');
    const indentYmlFile2 = path.join(process.cwd(), 'parsers', 'indentFile2.yaml');
    const indentYmlDiff = gendiff(indentYmlFile1, indentYmlFile2);
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
    expect(indentYmlDiff).toEqual(functions.stylish(expectedIndent));
  });
});
