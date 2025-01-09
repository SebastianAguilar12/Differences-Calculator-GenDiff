import path from 'node:path';
import _ from 'lodash';
import analizeFile from './utils.js';

export default function gendiff(filepath1, filepath2) {
  const pathFileOne = path.resolve(process.cwd(), filepath1);
  const pathFileTwo = path.resolve(process.cwd(), filepath2);
  const fileOneAnalysis = analizeFile(pathFileOne);
  const fileTwoAnalysis = analizeFile(pathFileTwo);
  if (fileOneAnalysis && fileTwoAnalysis) {
    const keysFileOne = Object.keys(fileOneAnalysis);
    const keysFileTwo = Object.keys(fileTwoAnalysis);
    const unionKeys = _.union(keysFileOne, keysFileTwo).sort();
    const result = unionKeys.reduce((acc, key) => {
      const key1 = `- ${key}`;
      const key2 = `+ ${key}`;
      if (fileOneAnalysis[key] === fileTwoAnalysis[key]) {
        acc[key] = fileOneAnalysis[key];
        return acc;
      }
      if (fileOneAnalysis[key] !== fileTwoAnalysis[key]) {
        acc[key1] = fileOneAnalysis[key];
        acc[key2] = fileTwoAnalysis[key];
        return acc;
      }
      return null;
    }, {});
    return JSON.stringify(result, null, 2);
  }
  return null;
}
