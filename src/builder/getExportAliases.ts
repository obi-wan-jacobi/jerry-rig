import getExpressionAlias from '@builder/getExpressionAlias';

export default function getExportAliases(fileContent: string): string[] {
  return fileContent
    .split('/*')
    .map((exp) => exp.split('*/').pop())
    .join()
    .split('\n')
    .filter((exp) => !exp.trimStart().startsWith('//'))
    .filter((exp) => !exp.includes('export default'))
    .filter((exp) => exp.includes('export'))
    .flatMap((exp) => exp.split('export'))
    .map(getExpressionAlias)
    .filter((exp) => exp && exp.length > 0) as string[];
}
