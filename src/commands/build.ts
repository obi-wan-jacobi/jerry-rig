import buildPackageIndex from '@builder/buildPackageIndex';
import spawnChildProcessInSameShell from '@src/shell/spawnChildProcessInSameShell';
import CommandHandler from './CommandHandler';

const args = process.argv.slice(2);
const cwd = args[0];

new CommandHandler(buildPackageIndex).invoke();
new CommandHandler('npm run build')
  .invoke()
  .then(() => {
    return spawnChildProcessInSameShell({
      cmd: 'npm run lint',
      cwd,
    });
  })
  .then(() => {
    return spawnChildProcessInSameShell({
      cmd: 'npm run prettier-format',
      cwd,
    });
  });
