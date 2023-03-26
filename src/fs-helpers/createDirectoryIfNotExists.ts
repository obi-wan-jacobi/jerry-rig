import fs from 'fs';

export default function createDirectoryIfNotExists(path: string): void {
  if (fs.existsSync(path)) {
    return;
  }
  fs.mkdirSync(path);
}
