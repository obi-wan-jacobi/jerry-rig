import IJsonPatchOperation from '@interfaces/IJsonPatchOperation';
import getFileContentAsString from '@fs-helpers/getFileContentAsString';
import fs from 'fs';

const jsonpatch = require('json-patch');

export default function patchJsonFile(filePath: string, ops: IJsonPatchOperation[]): void {
  let packageJson = JSON.parse(getFileContentAsString(filePath));
  packageJson = jsonpatch.apply(packageJson, ops);
  fs.writeFileSync(filePath, JSON.stringify(packageJson, undefined, 2));
}
