import IJsonPatchOperation from '@interfaces/IJsonPatchOperation';
import getFileContentAsString from '@fs-helpers/getFileContentAsString';
import fs from 'fs';

const jsonpatch = require('json-patch');

export default function patchJsonFile(filePath: string, ops: IJsonPatchOperation[]): void {
  let json = JSON.parse(getFileContentAsString(filePath));
  json = jsonpatch.apply(json, ops);
  fs.writeFileSync(filePath, JSON.stringify(json, undefined, 2));
}
