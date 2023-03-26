export default interface IModuleReference {
  path: string;
  name: string;
  defaultExportAlias?: string;
  exportAliases: string[];
}
