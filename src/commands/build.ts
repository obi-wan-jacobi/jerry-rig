import buildPackageIndex from '@builder/buildPackageIndex';
import CommandHandler from './CommandHandler';
import AsyncCommandHandler from './AsyncCommandHandler';
import getAllPackageDependenciesAsync from '@src/node-helpers/getAllPackageDependenciesAsync';

const args = process.argv.slice(2);
const cwd = args[0];
const packageNames = args.length > 1 ? args[1].split(',').filter((x) => x !== 'undefined') : [];

new AsyncCommandHandler({ cmd: buildPackageIndex, cwd, packageNames })
  .invoke()
  .then(() => {
    return getAllPackageDependenciesAsync(cwd)
      .then((deps) => {
        const orderedPackages: string[] = [];
        while (deps.length) {
          const idx = deps.findIndex((dep) => dep[1].length === 0);
          const nextPackage = deps.splice(idx, 1)[0][0];
          orderedPackages.push(nextPackage);
          deps.forEach(([, dependencies]) => {
            const idx = dependencies.findIndex((dep) => dep === nextPackage);
            if (idx > -1) {
              dependencies.splice(idx, 1);
            }
          });
        }
        return orderedPackages;
      })
      .then((orderedPackages) => {
        return new CommandHandler({ cmd: 'npm run build', cwd, packageNames: orderedPackages }).invoke();
      });
  })
  .then(() => {
    return new AsyncCommandHandler({ cmd: 'npm run lint', cwd, packageNames }).invoke();
  })
  .then(() => {
    return new AsyncCommandHandler({ cmd: 'npm run prettier-format', cwd, packageNames }).invoke();
  });
