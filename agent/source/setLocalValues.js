const gitCloneRepo = require('./utils/git/gitCloneRepo');
const gitInstallRepoRequirements = require('./utils/git/gitInstallRepoRequirements');

const setSettings =
  (app, gitCloneRepo, gitInstallRepoRequirements) =>
  async ({ repoName, buildCommand, mainBranch = app.locals._settings.mainBranch }) => {
    console.log('\tСохранение настроек...');

    console.log('\t\tсравнение repoName...');
    // if (repoName !== app.locals._settings.repoName) {
    //   console.log('\t\t\t...новый репозиторий');
      app.locals._settings.repoName = repoName;

    //   const res = await gitCloneRepo(repoName, mainBranch);
    //   if (res.status === 0) await gitInstallRepoRequirements();
    // } else {
    //   console.log('\t\t\t...старый репозиторий');
    // }
    app.locals._settings.buildCommand = buildCommand;
    app.locals._settings.mainBranch = mainBranch;

    console.log('\t\t...сохрание завершено');
  };

const setBuildStatus = (app, validStatuses) => (status) => {
  if (!validStatuses.includes(status)) {
    throw Error(`Status ${status} is not valid`);
  }
  app.locals._buildStatus = status;
};

const getBuildStatus = (app) => () => app.locals._buildStatus;

const setLocalValues = (app, { host, port }) => {
  app.locals.agentInfo = { host, accessPort: port };

  app.locals._settings = {
    repoName: '',
    buildCommand: 'echo "THERE IS NO REPO MAN"',
    mainBranch: '',
  };
  app.locals.setSettings = setSettings(app, gitCloneRepo, gitInstallRepoRequirements);

  const validStatuses = ['unactive', 'setuping', 'active', 'finished'];
  app.locals._buildStatus = 'unactive';
  app.locals.setBuildStatus = setBuildStatus(app, validStatuses);
  app.locals.getBuildStatus = getBuildStatus(app);
};

module.exports = setLocalValues;
