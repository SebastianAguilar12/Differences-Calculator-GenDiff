import path from 'node:path';
import * as functions from './utils.js';

export default function gendiff(filepath1, filepath2, formatter = functions.stylish) {
  const pathFileOne = path.resolve(process.cwd(), filepath1);
  const pathFileTwo = path.resolve(process.cwd(), filepath2);
  const fileOneAnalysis = functions.analizeFile(pathFileOne);
  const fileTwoAnalysis = functions.analizeFile(pathFileTwo);
  const object = functions.diff(fileOneAnalysis, fileTwoAnalysis);
  return formatter(object);
}
