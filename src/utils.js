import fs from 'node:fs';

export default function analizeFile (path) {
  try {
    const readingFile = fs.readFileSync(path, 'utf8');
    return JSON.parse(readingFile);
  } catch (error) {
    console.error(error);    
  }
}