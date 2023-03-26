export default function myFunction(): void {
  console.log('Hello World!');
}

export function myOtherFunction(): void {
  console.log('Hello World!');
}

export function myGenericFunction<T extends any>(arg: T): void {
  console.log(`Hello ${arg}`);
}

export const myArrowFunction = (): void => {
  console.log('Hello World!');
};

export const myVariable = {};

export const myTypedVariable: any = {};

export class MyBasicClass {}

export class MyGenericClass<T extends any> {
  public method(): T {
    return {} as T;
  }
}

export interface IMyInterface {
  property1: string;
}

export interface IMyGenericInterface<T extends any> {
  property1: T;
}
