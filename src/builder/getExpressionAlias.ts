// limitations:
// - export must contain '=' or 'function' to be split properly
export default function getExpressionAliases(expression: string): string[] {
  if (!expression.includes('export')) {
    return [];
  }
  expression = expression.split('<').shift()!;
  if (expression.includes('export default (')) {
    return [];
  }
  if (expression.includes('export default {')) {
    return [];
  }
  if (expression.includes('export {')) {
    return expression
      .split('export {')
      .pop()!
      .split('};')
      .shift()!
      .split(',')
      .map((x) => x.split(' as ').pop()!.trim());
  }
  if (expression.includes(' function ')) {
    const alias = expression.split(' function ').pop()!.split('(').shift()!.trim();
    return [alias];
  }
  if (expression.includes(' function(')) {
    return [];
  }
  if (expression.includes(' interface ')) {
    const alias = expression.split(' interface ').pop()!.split('{').shift()!.split(' extends ').shift()!.trim();
    return [alias];
  }
  if (expression.includes(' class ')) {
    const alias = expression
      .split(' class ')
      .pop()!
      .split('{')
      .shift()!
      .split(' implements ')
      .shift()!
      .split(' extends ')
      .shift()!
      .trim();
    return [alias];
  }
  if (expression.includes('export enum')) {
    const alias = expression.split('export enum').pop()!.split('{').shift()!.trim();
    return [alias];
  }
  if (expression.includes('=')) {
    const alias = expression
      .split('=')
      .shift()!
      .split(':')
      .shift()!
      .split(' ')
      .filter((expression) => expression.length > 0)
      .pop()!
      .trim();
    return [alias];
  }
  return [expression.split('export default').pop()!.split(';').shift()!.trim()] ?? undefined;
}
