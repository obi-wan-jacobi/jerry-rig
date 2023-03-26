// limitations:
// - export must contain '=' or 'function' to be split properly
export default function getExpressionAlias(expression: string): string | undefined {
  if (expression.includes('export default ()')) {
    return undefined;
  }
  if (expression.includes('=')) {
    const alias = expression
      .split('=')
      .shift()!
      .split(' ')
      .filter((expression) => expression.length > 0)
      .pop()!;
    return alias;
  }
  if (expression.includes('function')) {
    const alias = expression.split('function').pop()!.split('(').shift()!.trim();
    return alias;
  }
  if (expression.includes('interface')) {
    const alias = expression.split('interface').pop()!.split('{').shift()!.trim();
    return alias;
  }
  return undefined;
}
