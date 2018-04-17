const path = require('path');

module.exports = {
  globals: ['CorePlayer'],
  excludes: ['./api/**', './dist/**', './public/**'],
  moduleNameFormatter({ moduleName, pathToCurrentFile }) {
    if (moduleName.startsWith('src/')) {
      return moduleName.replace('src/', '');
    }
    return moduleName;
  },
  useRelativePaths({ pathToImportedModule, pathToCurrentFile }) {
    const fileDir = path.dirname(pathToCurrentFile);

    return pathToImportedModule.includes(fileDir);
  },
};
