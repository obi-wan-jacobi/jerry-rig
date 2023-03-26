import getDirectoryPathsAsync from '@fs-helpers/getDirectoryPathsAsync';
import spawnChildProcessInSameShell from '@shell/spawnChildProcessInSameShell';

export default class CommandHandler {
  private __cmd: string | ((packagePath: string) => void);
  private __cwd?: string;
  private __packageName?: string;

  public constructor(cmd: string | ((packagePath: string) => void), cwd?: string, packageName?: string) {
    this.__cmd = cmd;
    this.__cwd = cwd;
    this.__packageName = packageName;
  }

  public async invoke(): Promise<string[]> {
    const args = process.argv.slice(2);
    const cwd = this.__cwd ?? args[0];
    const packageName = this.__packageName ?? args[1];
    return new Promise<string[]>((resolve) => {
      if (packageName && packageName !== 'undefined' && packageName.length > 0) {
        return resolve([`${cwd}/packages/${packageName}`]);
      }
      return getDirectoryPathsAsync(`${cwd}/packages`).then(resolve);
    }).then((packagePaths) => {
      let psync = Promise.resolve();
      packagePaths.forEach((path) => {
        psync = psync.then(() => {
          if (typeof this.__cmd === 'string') {
            return spawnChildProcessInSameShell({
              cmd: this.__cmd,
              cwd: path,
            });
          }
          return this.__cmd(path);
        });
      });
      return psync.then(() => packagePaths);
    });
  }
}
