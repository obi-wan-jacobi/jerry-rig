import fetchRepoContentsAsync from '@src/degit/fetchRepoContentsAsync';
import patchJsonFile from '@fs-helpers/patchJsonFile';
import getFileContentAsString from '@src/fs-helpers/getFileContentAsString';
import fs from 'fs';

export default function add(cwd: string, packageName: string): Promise<void> {
  return fetchRepoContentsAsync('obi-wan-jacobi/template-nodejs-ts-package', `${cwd}/packages/${packageName}`).then(
    () => {
      const json = JSON.parse(getFileContentAsString(`${cwd}/package.json`));
      json.workspaces = ([] as string[]).concat(json.workspaces).concat([`packages/${packageName}`]);
      fs.writeFileSync(`${cwd}/package.json`, JSON.stringify(json, undefined, 2));
      return patchJsonFile(`${cwd}/packages/${packageName}/package.json`, [
        { op: 'replace', path: '/name', value: `@${json.name}/${packageName}` },
      ]);
    },
  );
}
