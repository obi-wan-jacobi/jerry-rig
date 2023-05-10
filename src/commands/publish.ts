import CommandHandler from './CommandHandler';

const args = process.argv.slice(2);
const cwd = args[0];
const packageNames = args.length > 1 ? args[1].split(',').filter((x) => x !== 'undefined') : [];

new CommandHandler({ cmd: 'npm publish --access public', cwd, packageNames }).invoke();
