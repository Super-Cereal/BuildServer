const fsUtils = require('./fs');

const deleteSavedStructures = {
  async deleteSavedRepository() {
    let repoDeleteInfo;
    if (await fsUtils.exists('./data/Repository')) {
      repoDeleteInfo = await fsUtils.deleteDir('./data/Repository');
    }
    if (await fsUtils.exists('./data/config.txt')) {
      await fsUtils.deleteDir('./data/config.txt');
    }
    return repoDeleteInfo;
  },
};

module.exports = deleteSavedStructures;
