import { exec } from 'child_process';

const args = process.argv.slice(2);



// eslint-disable-next-line @typescript-eslint/naming-convention
exec(`cd ./packages/${args[0]} && npm run build && npm publish --access public`, (_, stdout: string, stderr: string) => {
  console.log(stdout);
  console.log(stderr);
});