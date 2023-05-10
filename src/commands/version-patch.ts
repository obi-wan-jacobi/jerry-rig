import spawnChildProcessInSameShell from '@shell/spawnChildProcessInSameShell';
import CommandHandler from './CommandHandler';

const args = process.argv.slice(2);
const cwd = args[0];
const packageNames = args.length > 1 ? args[1].split(',').filter((x) => x !== 'undefined') : [];

const NPX_TSNODE_COMMAND_PREFIX = 'npx ts-node -r tsconfig-paths/register';

spawnChildProcessInSameShell({
  cmd: `${NPX_TSNODE_COMMAND_PREFIX} ./build.ts ${cwd} ${packageNames}`,
  cwd: __dirname,
}).then(() => {
  return new CommandHandler({ cmd: 'npm version patch', cwd, packageNames }).invoke();
});
