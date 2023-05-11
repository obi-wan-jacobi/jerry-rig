import getDirectoryPathsAsync from '@src/fs-helpers/getDirectoryPathsAsync';
import getFileContentAsString from '@src/fs-helpers/getFileContentAsString';

export default function getAllPackageDependenciesAsync(rootPath: string): Promise<[string, string[]][]> {
  const monorepoName = JSON.parse(getFileContentAsString(`${rootPath}/package.json`)).name;
  return getDirectoryPathsAsync(`${rootPath}/packages`)
    .then((packagePaths) => {
      return packagePaths.map((packagePath) => JSON.parse(getFileContentAsString(`${packagePath}/package.json`)));
    })
    .then((packageJsons) => {
      return packageJsons
        .filter((packageJson) => !!packageJson.dependencies)
        .map((packageJson) => [
          packageJson.name.replace(`@${monorepoName}/`, ''),
          Object.keys(packageJson.dependencies)
            .filter((dep: string) => dep.startsWith(`@${monorepoName}/`))
            .map((dep: string) => dep.replace(`@${monorepoName}/`, '')),
        ]) as [string, string[]][];
    });
}
