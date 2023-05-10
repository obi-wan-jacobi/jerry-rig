import createDirectoryIfNotExists from '@fs-helpers/createDirectoryIfNotExists';
import fetchRepoContentsAsync from '@src/degit/fetchRepoContentsAsync';
import patchJsonFile from '@fs-helpers/patchJsonFile';
import getFileContentAsString from '@src/fs-helpers/getFileContentAsString';
import fs from 'fs';

const args = process.argv.slice(2);
const cwd = args[0];
const packageName = args[1];

createDirectoryIfNotExists(`${cwd}/packages/${packageName}`);
fetchRepoContentsAsync('obi-wan-jacobi/template-nodejs-ts-package', `${cwd}/packages/${packageName}`)
  .then(() => {
    const json = JSON.parse(getFileContentAsString(`${cwd}/package.json`));
    json.workspaces = ([] as string[]).concat(json.workspaces).concat([`packages/${packageName}`]);
    fs.writeFileSync(`${cwd}/package.json`, JSON.stringify(json, undefined, 2));
    patchJsonFile(`${cwd}/packages/${packageName}/package.json`, [
      { op: 'replace', path: '/name', value: `@${json.name}/${packageName}` },
    ]);
  })
  .then(() => {
    createDirectoryIfNotExists(`${args[0]}/packages`);
  });
