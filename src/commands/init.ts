import createDirectoryIfNotExists from '@fs-helpers/createDirectoryIfNotExists';
import spawnChildProcessInSameShell from '@shell/spawnChildProcessInSameShell';

const args = process.argv.slice(2);

spawnChildProcessInSameShell({
  cmd: 'npm init',
  cwd: args[0],
}).then(() => {
  createDirectoryIfNotExists(`${args[0]}/packages`);
});
