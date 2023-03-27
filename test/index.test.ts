import getFileContentAsString from '@fs-helpers/getFileContentAsString';

describe('building the index of package-1', () => {
  it('should contain all exported references', () => {
    const indexFile = getFileContentAsString('./packages/package-1/lib/index.ts');
    const expectedReferences = [
      'CONSTANTS',
      'IInterface',
      'IInterfaceWithGeneric',
      'MyGenericSubfolderClass',
      'MySubfolderClass',
      'exportdefaultanonymousarrowfunction',
      'exportdefaultanonymousclass',
      'exportdefaultanonymousfunction',
      'exportdefaultanonymousgenericarrowfunction',
      'exportdefaultanonymousgenericfunction',
      'exportdefaultanonymousobject',
      'namedArrowFunction',
      'namedFunction',
      'namedGenericFunction',
      'namedObject',
      'myFunction',
      'myOtherFunction',
      'functionfunctionfunction',
      'myGenericFunction',
      'myArrowFunction',
      'myGenericArrowFunction',
      'myVariable',
      'myTypedVariable',
      'MyBasicClass',
      'Classclassclass',
      'Classclassextendsclass',
      'Classclassimplementsclass',
      'Classclassextendsclassimplementsclass',
      'MyGenericClass',
      'MySubClass',
      'IMyInterface',
      'IInterfaceinterfaceinterface',
      'IInterfaceinterfaceextendsinterface',
      'IMyGenericInterface',
      'IMyOtherInterface',
      'MySpecialClass',
      'MyOtherSpecialClass',
      'MyVerySpecialClass',
      'MY_ENUM',
    ];
    expectedReferences.forEach((ref) => {
      if (!indexFile.includes(ref)) {
        console.log(ref);
      }
      expect(indexFile.includes(ref)).toBe(true);
    });
  });
});
