import createDirectoryIfNotExists from '@fs-helpers/createDirectoryIfNotExists';
import fetchRepoContentsAsync from '@src/degit/fetchRepoContents';
import patchJsonFile from '@fs-helpers/patchJsonFile';

const args = process.argv.slice(2);
const cwd = args[0];
const packageName = args[1];

createDirectoryIfNotExists(`${cwd}/packages/${packageName}`);
fetchRepoContentsAsync('obi-wan-jacobi/template-nodejs-ts-package', `${cwd}/packages/${packageName}`)
  .then(() => {
    patchJsonFile(`${cwd}/packages/${packageName}/package.json`, [
      { op: 'replace', path: '/name', value: packageName },
    ]);
  })
  .then(() => {
    createDirectoryIfNotExists(`${args[0]}/packages`);
  });
