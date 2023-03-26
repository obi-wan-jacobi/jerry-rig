#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-empty-function */
///
/*
DO NOT USE TSCONFIG-PATHS IN THIS FILE.

ALL IMPORTS MUST BE RELATIVE.
*/
///
import yargs from 'yargs';
import spawnChildProcessInSameShell from './shell/spawnChildProcessInSameShell';

const NPX_TSNODE_COMMAND_PREFIX = 'npx ts-node -r tsconfig-paths/register';

yargs(process.argv.slice(2))
  .scriptName('jerry')
  .command({
    command: 'init <name>',
    describe: 'Create a new project',
    builder: () => {},
    handler: (argv: any) => {
      spawnChildProcessInSameShell({
        cmd: `${NPX_TSNODE_COMMAND_PREFIX} ../src/commands/init.ts ${process.cwd()} ${argv.name}`,
        cwd: __dirname,
      });
    },
  } as unknown as yargs.CommandModule)
  .command({
    command: 'add <name>',
    aliases: ['a'],
    describe: 'Add a new package',
    builder: () => {},
    handler: (argv: any) => {
      spawnChildProcessInSameShell({
        cmd: `${NPX_TSNODE_COMMAND_PREFIX} ../src/commands/add.ts ${process.cwd()} ${argv.name}`,
        cwd: __dirname,
      });
    },
  } as unknown as yargs.CommandModule)
  .command({
    command: 'build [package]',
    aliases: ['b'],
    describe: 'Build all packages or a named package',
    builder: () => {},
    handler: (argv: any) => {
      spawnChildProcessInSameShell({
        cmd: `${NPX_TSNODE_COMMAND_PREFIX} ../src/commands/build.ts ${process.cwd()} ${argv.package}`,
        cwd: __dirname,
      });
    },
  } as unknown as yargs.CommandModule)
  .command({
    command: 'install [package]',
    aliases: ['i'],
    describe: 'Run npm install in all packages or in the named package',
    builder: () => {},
    handler: (argv: any) => {
      spawnChildProcessInSameShell({
        cmd: `${NPX_TSNODE_COMMAND_PREFIX} ../src/commands/install.ts ${process.cwd()} ${argv.package}`,
        cwd: __dirname,
      });
    },
  } as unknown as yargs.CommandModule)
  .command({
    command: 'update [package]',
    aliases: ['u'],
    describe: 'Run npm update in all packages or in the named package',
    builder: () => {},
    handler: (argv: any) => {
      spawnChildProcessInSameShell({
        cmd: `${NPX_TSNODE_COMMAND_PREFIX} ../src/commands/update.ts ${process.cwd()} ${argv.package}`,
        cwd: __dirname,
      });
    },
  } as unknown as yargs.CommandModule)
  .command({
    command: 'version patch [package]',
    aliases: ['p'],
    describe: 'Run npm version patch in all packages or in the named package',
    builder: () => {},
    handler: (argv: any) => {
      spawnChildProcessInSameShell({
        cmd: `${NPX_TSNODE_COMMAND_PREFIX} ../src/commands/version-patch.ts ${process.cwd()} ${argv.package}`,
        cwd: __dirname,
      });
    },
  } as unknown as yargs.CommandModule)
  .command({
    command: 'publish [package]',
    aliases: ['p'],
    describe: 'Run npm publish in all packages or in the named package',
    builder: () => {},
    handler: (argv: any) => {
      spawnChildProcessInSameShell({
        cmd: `${NPX_TSNODE_COMMAND_PREFIX} ../src/commands/publish.ts ${process.cwd()} ${argv.package}`,
        cwd: __dirname,
      });
    },
  } as unknown as yargs.CommandModule)
  .demandCommand()
  .help().argv;
