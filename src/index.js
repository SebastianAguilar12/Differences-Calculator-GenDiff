import path from 'node:path';
import analyzeFile from './utils.js';
import getDiff from './diff.js';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';
import json from './formatters/index.js';

export default function gendiff(filepath1, filepath2, formatName = 'stylish') {
  if (filepath1 === undefined || filepath2 === undefined) {
    return 'Error: File paths are missing.';
  }
  const extFile1 = path.extname(filepath1);
  const extFile2 = path.extname(filepath2);
  const getPathFile = ((filepath, ext) => {
    if (ext === '.json' || ext === '.yml' || ext === '.yaml') {
      return path.resolve(process.cwd(), '__fixtures__', filepath);
    }
    return filepath;
  });
  const fileOneAnalysis = analyzeFile(getPathFile(filepath1, extFile1));
  const fileTwoAnalysis = analyzeFile(getPathFile(filepath2, extFile2));
  const object = getDiff(fileOneAnalysis, fileTwoAnalysis);
  if (typeof formatName === 'function') {
    return formatName(object);
  }
  switch (formatName) {
    case 'stylish':
      return stylish(object);
    case 'plain':
      return plain(object);
    case 'json':
      return json(object);
    default:
      return stylish(object);
  }
}
