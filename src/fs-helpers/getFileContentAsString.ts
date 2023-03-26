import fs from 'fs';

export default function getFileContentAsString(filePath: string): string {
  try {
    return fs.readFileSync(filePath).toString();
  } catch {
    return '';
  }
}
