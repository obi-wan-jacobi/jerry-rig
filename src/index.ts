// bootstrap tsconfig-paths
const tsConfig = require('./tsconfig.json');
const tsConfigPaths = require('tsconfig-paths');

tsConfigPaths.register({
  baseUrl: process.argv[1].split('index.js').join(''),
  paths: tsConfig.compilerOptions.paths,
});

// main
import yargs from 'yargs';
import init from '@commands/init';
import add from './commands/add';
import build from './commands/build';
import update from './commands/update';
import versionPatch from './commands/versionPatch';
import publish from './commands/publish';
import doCommand from './commands/doCommand';

yargs(process.argv.slice(2))
  .scriptName('jerry')
  .command({
    command: 'init <name>',
    describe: 'Create a new project',
    handler: (argv: any) => {
      return init(process.cwd(), argv.name);
    },
  } as unknown as yargs.CommandModule)
  .command({
    command: 'add <name>',
    aliases: ['a'],
    describe: 'Add a new package',
    handler: (argv: any) => {
      return add(process.cwd(), argv.name);
    },
  } as unknown as yargs.CommandModule)
  .command({
    command: 'build [packages..]',
    aliases: ['b'],
    describe: 'Build all packages or named packages',
    handler: (argv: any) => {
      return build(process.cwd(), argv.packages);
    },
  } as unknown as yargs.CommandModule)
  .command({
    command: 'update [packages..]',
    aliases: ['u'],
    describe: 'Run npm update in all packages or in named packages',
    handler: (argv: any) => {
      return update(process.cwd(), argv.packages);
    },
  } as unknown as yargs.CommandModule)
  .command({
    command: 'version patch [packages..]',
    aliases: ['vp'],
    describe: 'Run npm version patch in all packages or in named packages',
    handler: (argv: any) => {
      return versionPatch(process.cwd(), argv.packages);
    },
  } as unknown as yargs.CommandModule)
  .command({
    command: 'publish [packages..]',
    aliases: ['p'],
    describe: 'Run npm publish in all packages or in named packages',
    handler: (argv: any) => {
      return publish(process.cwd(), argv.packages);
    },
  } as unknown as yargs.CommandModule)
  .command({
    command: 'do <command> [packages..]',
    aliases: ['do'],
    describe: 'Run a command against all packages or in named packages',
    handler: (argv: any) => {
      return doCommand(process.cwd(), argv.command, argv.packages);
    },
  } as unknown as yargs.CommandModule)
  .demandCommand()
  .help().argv;
