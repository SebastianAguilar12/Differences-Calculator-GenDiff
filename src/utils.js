import fs from 'node:fs';
import yaml from 'js-yaml';
import path from 'node:path';

export default function analyzeFile(pathFile) {
  try {
    const extensionFile = path.extname(pathFile);
    let readingFile;
    switch (extensionFile) {
      case ('.json'):
        readingFile = fs.readFileSync(pathFile, 'utf8');
        return JSON.parse(readingFile);
      case ('.yml'):
        readingFile = yaml.load(fs.readFileSync(pathFile, 'utf8'));
        return readingFile;
      case ('.yaml'):
        readingFile = yaml.load(fs.readFileSync(pathFile, 'utf8'));
        return readingFile;
      case ('.txt'):
        readingFile = fs.readFileSync(pathFile, 'utf8');
        return readingFile;
      default:
        return null;
    }
  } catch (error) {
    console.error(error);
  }
  return null;
}
