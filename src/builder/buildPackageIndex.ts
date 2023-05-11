import getFileContentAsString from '@fs-helpers/getFileContentAsString';
import getPackageModuleReferences from '@builder/getPackageModuleReferences';
import fs from 'fs';

export default function buildPackageIndex(packagePath: string): Promise<void> {
  const moduleReferences = getPackageModuleReferences(packagePath);
  const imports: string[] = moduleReferences.map((moduleReference) => {
    const defaultAlias = moduleReference.defaultExportAlias ? `${moduleReference.defaultExportAlias}, ` : '';
    return `import ${defaultAlias}{ ${moduleReference.exportAliases.join(', ')} } from '${moduleReference.path}';`;
  });
  moduleReferences.forEach((mr) => {
    if (mr.defaultExportAlias) {
      mr.exportAliases.unshift(mr.defaultExportAlias);
    }
  });
  const exports = `export { ${moduleReferences.flatMap((mr) => mr.exportAliases).join(', ')} };`;
  const autogenContent = ['// <autogen>', ...imports.sort(), exports, '// </autogen>'];
  const authoredContent = getFileContentAsString(`${packagePath}/lib/index.ts`)
    .split('// </autogen>')
    .pop()!
    .split('\n');
  const index = autogenContent
    .concat(authoredContent)
    .filter((line) => line.length > 0)
    .join('\n');
  fs.writeFileSync(`${packagePath}/lib/index.ts`, index);
  return Promise.resolve();
}
