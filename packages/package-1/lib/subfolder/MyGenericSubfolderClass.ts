export default class MyGenericSubfolderClass<T extends any> {
  private __member: T;

  public constructor(arg: T) {
    this.__member = arg;
  }
}
