import path from 'node:path';
import analizeFile from './utils.js';
import _ from 'lodash';

export default function gendiff(filepath1, filepath2) {
  const curretDirectory = process.cwd();
  const pathFileOne = path.resolve(curretDirectory, filepath1);
  const pathFileTwo = path.resolve(curretDirectory, filepath2);
  const fileOneAnalysis = analizeFile(pathFileOne);
  const fileTwoAnalysis = analizeFile(pathFileTwo);
  if (fileOneAnalysis && fileTwoAnalysis) {
    const keysFileOne = Object.keys(fileOneAnalysis);
    const keysFileTwo = Object.keys(fileTwoAnalysis);
    const unionKeys = _.union(keysFileOne, keysFileTwo).sort();
    console.log('Keys File1: ', keysFileOne);
    console.log('Keys File2: ', keysFileTwo);
    console.log('Union: ', unionKeys);
    const result = unionKeys.reduce((acc, key) => {
      const key1 = '-' + key;
      const key2 = '+' + key;
      if (fileOneAnalysis[key] === fileTwoAnalysis[key]) {
        acc[key] = fileOneAnalysis[key];
        return acc;
      }
      if (fileOneAnalysis[key] !== fileTwoAnalysis[key]) {
        acc[key1] = fileOneAnalysis[key];
        acc[key2] = fileTwoAnalysis[key];
        return acc;
      }
    }, {});
    return JSON.stringify(result, null, 2);
  }
}
