import * as fs from 'fs';

export default async function getDirectoryPathsAsync(basePath: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(basePath, (err: NodeJS.ErrnoException, directories: string[]) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(directories.map((d) => `${basePath}/${d}`));
    });
  });
}
