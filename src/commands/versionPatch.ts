import CommandHandler from './CommandHandler';
import build from './build';

export default function versionPatch(cwd: string, packageNames: string[]) {
  return build(cwd, packageNames).then(() => {
    return new CommandHandler({ cmd: 'npm version patch', cwd, packageNames }).invoke();
  });
}
