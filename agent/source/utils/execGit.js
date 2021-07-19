const { exec, deleteSavedRepository } = require('./fs');

const cloneRepo = async (repoName) => {
  await deleteSavedRepository();
  console.log(`\nstarted cloning ${repoName}`);
  console.time('cloned');
  await exec(`git clone ${repoName} ./data/Repository`);
  console.timeEnd('cloned');

  console.log(`\nstarted installing requirements ${repoName}`);
  console.time('requirements installed');
  await exec('cd ./data/Repository && npm ci');
  console.timeEnd('requirements installed');

  return { status: 0 };
};

module.exports = cloneRepo;
