import getDirectoryPathsAsync from '@fs-helpers/getDirectoryPathsAsync';
import spawnChildProcessInSameShell from '@shell/spawnChildProcessInSameShell';

export default class CommandHandler {
  private __cmd: string | ((packagePath: string) => void);
  private __cwd: string;
  private __packageNames: string[];

  public constructor({
    cmd,
    cwd,
    packageNames = [],
  }: {
    cmd: string | ((packagePath: string) => void);
    cwd: string;
    packageNames: string[];
  }) {
    this.__cmd = cmd;
    this.__cwd = cwd;
    this.__packageNames = packageNames;
  }

  public async invoke(): Promise<string[]> {
    const cwd = this.__cwd;
    const packageNames = this.__packageNames;
    return new Promise<string[]>((resolve) => {
      if (packageNames.length > 0) {
        return resolve(packageNames.map((packageName) => `${cwd}/packages/${packageName}`));
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
