import AsyncCommandHandler from './AsyncCommandHandler';

export default function publish(cwd: string, packageNames: string[]) {
  return new AsyncCommandHandler({ cmd: 'npm publish --access public', cwd, packageNames }).invoke();
}
