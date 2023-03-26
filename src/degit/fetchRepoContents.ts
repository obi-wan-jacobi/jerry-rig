const degit = require('degit');

export default async function fetchRepoContentsAsync(userRepo: string, destination: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const emitter = degit(userRepo, {
      cache: false,
      force: true,
      verbose: true,
    });
    emitter.on('info', (info: any) => {
      console.log(info.message);
    });
    emitter.on('error', (error: any) => {
      console.log(error.message);
      reject();
    });
    emitter.clone(destination).then(() => {
      resolve();
    });
  });
}
