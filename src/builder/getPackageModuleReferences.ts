import getFileContentAsString from '@src/fs-helpers/getFileContentAsString';
import getFilePathsRecursively from '@src/fs-helpers/getFilePathsRecursively';
import IModuleReference from '@src/interfaces/IModuleReference';
import getExportAliases from '@builder/getExportAliases';
import getDefaultExportAlias from './getDefaultExportAlias';

export default function getPackageModuleReferences(packagePath: string): IModuleReference[] {
  return getFilePathsRecursively(`${packagePath}/lib`)
    .filter((filePath: string) => 'index.ts' !== filePath.split('/').pop())
    .map((filePath: string) => {
      const fileContent = getFileContentAsString(filePath);
      const fileName = filePath.split('/').pop()!.split('.').shift()!;
      return {
        path: `./${filePath.split('/lib/').pop()!.split('.').shift()}`,
        name: fileName,
        defaultExportAlias: getDefaultExportAlias(fileName, fileContent),
        exportAliases: getExportAliases(fileContent),
      } as IModuleReference;
    });
}
