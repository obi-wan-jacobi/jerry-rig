import { spawn } from 'child_process';

export default function spawnChildProcessInSameShell({ cmd, cwd }: { cmd: string; cwd: string }): Promise<void> {
  return new Promise((resolve, reject) => {
    spawn('cmd', ['/c', cmd], {
      cwd,
      shell: true,
      stdio: 'inherit',
    })
      .addListener('close', (code: number) => {
        code === 0 ? resolve() : reject();
      })
      .addListener('error', () => {
        reject();
      });
  });
}
