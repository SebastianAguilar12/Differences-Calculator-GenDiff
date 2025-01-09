import path from 'node:path';
import gendiff from '../src/index.js';

test('gendiff with two .json extension files', () => {
  const file1 = path.join(process.cwd(), 'file1.json');
  const file2 = path.join(process.cwd(), 'file2.json');
  const file3 = path.join(process.cwd(), 'file3.json');
  const file4 = path.join(process.cwd(), 'file4.json');
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
  expect(comparision1).toBe(JSON.stringify(expectedObject1, null, 2));
  expect(comparision2).toBe(JSON.stringify(expectedObject2, null, 2));
});
