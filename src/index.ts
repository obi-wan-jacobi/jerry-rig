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
    command: 'init',
    aliases: ['i'],
    describe: 'Create a new project',
    builder: () => {},
    handler: () => {
      spawnChildProcessInSameShell({
        cmd: `${NPX_TSNODE_COMMAND_PREFIX} ../src/commands/init.ts ${process.cwd()}`,
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
  .demandCommand()
  .help().argv;
