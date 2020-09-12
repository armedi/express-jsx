const fs = require('fs');
const path = require('path');

const config = require('./config.json');

function walkSync(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      filelist.push(dirFile);
    }
  });
  return filelist;
}

exports.getEntry = function getEntry() {
  return walkSync(config.viewsDir)
    .filter((f) => f.endsWith('.jsx'))
    .reduce((entry, filePath) => {
      return Object.assign(entry, {
        [filePath
          .replace(new RegExp(`^${config.viewsDir}/`), '')
          .replace(/.jsx$/, '')]: './' + filePath,
      });
    }, {});
};

exports.getOutputPath = function getOutputPath() {
  return path.resolve(process.cwd(), config.distDir);
};
