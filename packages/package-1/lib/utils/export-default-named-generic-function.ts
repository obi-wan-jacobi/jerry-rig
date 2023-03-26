export default function namedGenericFunction<T extends any>(): void {
  console.log('Hello World!' as T);
}
