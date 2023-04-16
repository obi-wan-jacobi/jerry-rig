import getExpressionAliases from '@builder/getExpressionAlias';

export default function getExportAliases(fileContent: string): string[] {
  const directExportsWithNoBrackets = `${fileContent}`
    .split('/*')
    .map((exp) => exp.split('*/').pop())
    .join()
    .split('\n')
    .filter((exp) => !exp.trimStart().startsWith('//'))
    .filter((exp) => !exp.includes('export default'))
    .filter((exp) => !exp.includes('export {'))
    .filter((exp) => exp.includes('export'));
  const exportsBetweenBracketsIterator = `${fileContent}`
    .split('/*')
    .map((exp) => exp.split('*/').pop())
    .join()
    .split('\n')
    .filter((exp) => !exp.trimStart().startsWith('//'))
    .filter((exp) => !exp.includes('export default'))
    .join(' ')
    .matchAll(/(?<=export {)(.*?)(?=};)/g);
  const exportsBetweenBrackets = Array.from(exportsBetweenBracketsIterator).map((x) => `export {${x[0]}};`);
  console.log(exportsBetweenBrackets);
  return directExportsWithNoBrackets
    .concat(exportsBetweenBrackets)
    .map(getExpressionAliases)
    .flat()
    .filter((exp) => exp && exp.length > 0) as string[];
}
