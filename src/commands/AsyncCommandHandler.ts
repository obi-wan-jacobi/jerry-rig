import getDirectoryPathsAsync from '@fs-helpers/getDirectoryPathsAsync';
import spawnChildProcessInSameShell from '@shell/spawnChildProcessInSameShell';

export default class AsyncCommandHandler {
  private __cmd: string | ((packagePath: string) => Promise<void>);
  private __cwd: string;
  private __packageNames: string[];

  public constructor({
    cmd,
    cwd,
    packageNames = [],
  }: {
    cmd: string | ((packagePath: string) => Promise<void>);
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
      return Promise.all(
        packagePaths.map((path) => {
          if (typeof this.__cmd === 'string') {
            return spawnChildProcessInSameShell({
              cmd: this.__cmd,
              cwd: path,
            });
          }
          return this.__cmd(path);
        }),
      ).then(() => packagePaths);
    });
  }
}
