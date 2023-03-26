import createDirectoryIfNotExists from '@fs-helpers/createDirectoryIfNotExists';
import fetchRepoContentsAsync from '@src/degit/fetchRepoContents';
import patchJsonFile from '@src/fs-helpers/patchJsonFile';

const args = process.argv.slice(2);
const cwd = args[0];
const packageName = args[1];

fetchRepoContentsAsync('obi-wan-jacobi/template-nodejs-ts-monorepo', cwd)
  .then(() => {
    patchJsonFile(`${args[0]}/package.json`, [{ op: 'replace', path: '/name', value: packageName }]);
  })
  .then(() => {
    createDirectoryIfNotExists(`${args[0]}/packages`);
  });
