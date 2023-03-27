export default function myFunction(): void {
  console.log('Hello World!');
}

export function myOtherFunction(): void {
  console.log('Hello World!');
}

export function functionfunctionfunction(): void {
  console.log('Hello World!');
}

export function myGenericFunction<T extends any>(): void {
  console.log('Hello World!' as T);
}

export const myArrowFunction = (): void => {
  console.log('Hello World!');
};
export const myGenericArrowFunction = <T extends any>(): void => {
  console.log('Hello World!' as T);
};

export const myVariable = {};

export const myTypedVariable: any = {};

export class MyBasicClass {}

export class Classclassclass {}

export class Classclassextendsclass {}

export class Classclassimplementsclass {}

export class Classclassextendsclassimplementsclass {}

export class MyGenericClass<T extends any> {
  public method(): T {
    return {} as T;
  }
}

export class MySubClass extends MyBasicClass {}

export interface IMyInterface {
  property1: string;
}

export interface IInterfaceinterfaceinterface {
  property1: string;
}

export interface IInterfaceinterfaceextendsinterface {
  property1: string;
}

export interface IMyGenericInterface<T extends any> {
  property1: T;
}

export interface IMyOtherInterface extends IMyInterface {
  property2: any;
}

export class MySpecialClass implements IMyOtherInterface {
  public property1: string;
  public property2: any;
}

export class MyOtherSpecialClass extends MySpecialClass implements IMyOtherInterface {}

export class MyVerySpecialClass<T extends any> extends MySubClass implements IMyOtherInterface {
  public property1: string;
  public property2: T;
}

export enum MY_ENUM {
  CONSTANT1,
  CONSTANT2,
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum enumenumenum {
  CONSTANT1,
  CONSTANT2,
}
