import createDirectoryIfNotExists from '@fs-helpers/createDirectoryIfNotExists';
import fetchRepoContentsAsync from '@src/degit/fetchRepoContentsAsync';
import patchJsonFile from '@src/fs-helpers/patchJsonFile';

export default function init(cwd: string, packageName: string): Promise<void> {
  return fetchRepoContentsAsync('obi-wan-jacobi/template-nodejs-ts-monorepo', cwd)
    .then(() => {
      return patchJsonFile(`${cwd}/package.json`, [{ op: 'replace', path: '/name', value: packageName }]);
    })
    .then(() => {
      return createDirectoryIfNotExists(`${cwd}/packages`);
    });
}
