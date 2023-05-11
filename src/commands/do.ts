import CommandHandler from './CommandHandler';

const args = process.argv.slice(2);
const cwd = args[0];
const command = args.slice(1, args.length).join(' ');

console.log(command);
new CommandHandler({ cmd: command, cwd, packageNames: [] }).invoke();
