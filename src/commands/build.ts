import getDirectoryPathsAsync from '@fs-helpers/getDirectoryPathsAsync';
import buildPackageIndex from '@builder/buildPackageIndex';
import spawnChildProcessInSameShell from '@src/shell/spawnChildProcessInSameShell';

const args = process.argv.slice(2);

new Promise<string[]>((resolve) => {
  if (args[1] && args[1] !== 'undefined' && args[1].length > 0) {
    buildPackageIndex(`${args[0]}/packages/${args[1]}`);
    resolve([`${args[0]}/packages/${args[1]}`]);
    return;
  }
  getDirectoryPathsAsync(`${args[0]}/packages`)
    .then((packagePaths) => {
      packagePaths.forEach(buildPackageIndex);
      return packagePaths;
    })
    .then(resolve);
}).then((packagePaths) => {
  let psync = Promise.resolve();
  packagePaths.forEach((path) => {
    psync = psync.then(() => {
      spawnChildProcessInSameShell({
        cmd: 'npm run build',
        cwd: path,
      });
    });
  });
});
