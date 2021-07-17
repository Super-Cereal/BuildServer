/* eslint-disable consistent-return */
const deleteSavedStructures = require('../deleteSavedStructures');
const { exec } = require('../fs');

const checkRepoNBranchExistance = async (repoName, mainBranch) => {
  const response = await exec(`git ls-remote --heads ${repoName} ${mainBranch}`);
  if (response.stderr) {
    return [false, { name: 'repoName', message: 'This repository is unavailable' }];
  }
  return [!!response.stdout, { name: 'mainBranch', message: 'This branch is unavailable' }];
};

module.exports = async (repoName, mainBranch) => {
  const [isExists, error] = await checkRepoNBranchExistance(repoName, mainBranch);
  if (!isExists) {
    return { status: 1, data: { error } };
  }

  await deleteSavedStructures.deleteSavedRepository();
  console.log(`started cloning ${repoName}`);
  console.time('cloned');
  await exec(`git clone ${repoName} ./data/Repository`);
  console.timeEnd('cloned');

  return { status: 0 };
};
