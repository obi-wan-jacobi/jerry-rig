import buildPackageIndex from '@builder/buildPackageIndex';
import CommandHandler from './CommandHandler';
import AsyncCommandHandler from './AsyncCommandHandler';

const args = process.argv.slice(2);
const cwd = args[0];
const packageNames = args.length > 1 ? args[1].split(',').filter((x) => x !== 'undefined') : [];

new CommandHandler({ cmd: buildPackageIndex, cwd, packageNames })
  .invoke()
  .then(() => {
    return new CommandHandler({ cmd: 'npm run build', cwd, packageNames }).invoke();
  })
  .then(() => {
    return new AsyncCommandHandler({ cmd: 'npm run lint', cwd, packageNames }).invoke();
  })
  .then(() => {
    return new AsyncCommandHandler({ cmd: 'npm run prettier-format', cwd, packageNames }).invoke();
  });
