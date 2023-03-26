import * as fs from 'fs';

export default function getFilePathsRecursively(path: string): any {
  try {
    const items = fs.readdirSync(path);
    return []
      .concat(
        items
          .filter((i: string) => fs.lstatSync(`${path}/${i}`).isDirectory())
          .flatMap((i: string) => getFilePathsRecursively(`${path}/${i}`)) as any,
      )
      .concat(
        items.filter((i: string) => fs.lstatSync(`${path}/${i}`).isFile()).map((i: string) => `${path}/${i}`) as any,
      );
  } catch {
    // path does not exist, skip
  }
  return [];
}
