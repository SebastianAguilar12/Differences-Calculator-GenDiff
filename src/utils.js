import fs from 'node:fs';
import yaml from 'js-yaml';
import path from 'node:path';

export default function analyzeFile(pathFile) {
  const extensionFile = path.extname(pathFile);
  // console.log(`Reading file: ${pathFile} with wxtension: ${extensionFile}`);
  const readingFile = fs.readFileSync(pathFile, 'utf8');
  // console.log(`File content: ${readingFile}`);
  const analyzedFile = (file) => {
    switch (extensionFile) {
      case ('.json'):
        return JSON.parse(file);
      case ('.yml'):
        return yaml.load(file);
      case ('.yaml'):
        return yaml.load(file);
      case ('.txt'):
        return file;
      default:
        return null;
    }
  };
  return analyzedFile(readingFile);
}
