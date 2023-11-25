import AsyncCommandHandler from './AsyncCommandHandler';

export default function update(cwd: string, packageNames: string[]) {
  return new AsyncCommandHandler({ cmd: 'npm update', cwd, packageNames }).invoke();
}
