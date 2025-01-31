import path from 'node:path';
import * as functions from './utils.js';

export default function gendiff(filepath1, filepath2, formatter = functions.stylish) {
  const extFile1 = path.extname(filepath1);
  const extFile2 = path.extname(filepath2);
  let pathFileOne = '';
  let pathFileTwo = '';
  if (extFile1 === '.json' && extFile2 === '.json') {
    pathFileOne = path.resolve(process.cwd(), '__fixtures__', filepath1);
    pathFileTwo = path.resolve(process.cwd(), '__fixtures__', filepath2);
  } else if ((extFile1 === '.yml' && extFile2 === '.yml') || (extFile1 === '.yaml' && extFile2 === '.yaml')) {
    pathFileOne = path.resolve(process.cwd(), 'parsers', filepath1);
    pathFileTwo = path.resolve(process.cwd(), 'parsers', filepath2);
  }
  const fileOneAnalysis = functions.analizeFile(pathFileOne);
  const fileTwoAnalysis = functions.analizeFile(pathFileTwo);
  const object = functions.diff(fileOneAnalysis, fileTwoAnalysis);
  return formatter(object);
}
