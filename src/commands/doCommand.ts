import CommandHandler from './CommandHandler';

export default function doCommand(cwd: string, command: string, packageNames: []): Promise<any> {
  return new CommandHandler({ cmd: command, cwd, packageNames }).invoke();
}
