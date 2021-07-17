const fs = require('fs');
const util = require('util');

const removeDirAsync = util.promisify(fs.rm);
const existsAsync = util.promisify(fs.exists);

const execAsync = util.promisify(require('child_process').exec);

module.exports = {
 deleteDir: async (path) => {
   await removeDirAsync(path, {
     recursive: true,
      force: true,
   });
  },

  exists: (path) => existsAsync(path),

  exec: execAsync,
};
