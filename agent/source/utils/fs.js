const fs = require('fs');
const util = require('util');

const removeDirAsync = util.promisify(fs.rm);
const existsAsync = util.promisify(fs.exists);

const execAsync = util.promisify(require('child_process').exec);

module.exports = {
  deleteSavedRepository: async () => {
    if (await existsAsync('./data/Repository')) {
      await removeDirAsync('./data/Repository', {
        recursive: true,
        force: true,
      });
    }
  },

  exec: execAsync,
};
