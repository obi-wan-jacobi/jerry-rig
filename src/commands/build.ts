import buildPackageIndex from '@builder/buildPackageIndex';
import CommandHandler from './CommandHandler';

new CommandHandler(buildPackageIndex).invoke();
new CommandHandler('npm run build').invoke();
