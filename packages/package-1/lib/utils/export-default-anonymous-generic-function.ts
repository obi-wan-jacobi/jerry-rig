/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
// eslint-disable-next-line space-before-function-paren
export default function <T extends any>(): void {
  console.log('Hello World!' as T);
}
