import getExpressionAliases from './getExpressionAlias';

export default function getDefaultExportAlias(fileName: string, fileContent: string): string | undefined {
  if (!fileContent.includes('export default')) {
    return undefined;
  }
  const defaultExportAlias = fileContent
    .split('/*')
    .map((exp) => exp.split('*/').pop())
    .join()
    .split('\n')
    .filter((exp) => !exp.trimStart().startsWith('//'))
    .filter((exp) => exp.includes('export default'))
    .map(getExpressionAliases)
    .flat()
    .filter((exp) => exp && exp.length > 0)
    .shift();
  if (defaultExportAlias) {
    return defaultExportAlias;
  }
  return fileName.replace(/[^0-9a-z]/gi, '');
}
