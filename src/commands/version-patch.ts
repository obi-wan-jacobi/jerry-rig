import spawnChildProcessInSameShell from '@shell/spawnChildProcessInSameShell';
import CommandHandler from './CommandHandler';

const args = process.argv.slice(2);
const cwd = args[0];
const packageName = args[1];

const NPX_TSNODE_COMMAND_PREFIX = 'npx ts-node -r tsconfig-paths/register';

spawnChildProcessInSameShell({
  cmd: `${NPX_TSNODE_COMMAND_PREFIX} ./build.ts ${cwd} ${packageName}`,
  cwd: __dirname,
})
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
  })
  .then(() => {
    return new CommandHandler('npm version patch').invoke();
  });
