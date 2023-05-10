import CommandHandler from './CommandHandler';

const args = process.argv.slice(2);
const cwd = args[0];
const packageNames = args.length > 0 ? args[1].split(',').filter((x) => x !== 'undefined') : [];

new CommandHandler({ cmd: 'npm install', cwd, packageNames }).invoke();
