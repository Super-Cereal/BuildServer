const cloneRepo = require('../utils/execGit');

const settings = (app) => {
  const setSettings =
    (app) =>
    async ({ repoName, buildCommand, mainBranch = app.locals._settings.mainBranch }) => {
      console.log('=> Сохранение настроек...');

      console.log('=> => сравнение repoName...');
      if (repoName !== app.locals._settings.repoName) {
        console.log('=> => => ...новый репозиторий');
        app.locals._settings.repoName = repoName;

        await cloneRepo(repoName);
      } else {
        console.log('=> => => ...старый репозиторий');
      }

      app.locals._settings.buildCommand = buildCommand;
      app.locals._settings.mainBranch = mainBranch;

      console.log('=> => ...сохрание завершено');
    };

  app.locals._settings = {
    repoName: '',
    buildCommand: 'echo "THERE IS NO REPO MAN"',
    mainBranch: '',
  };
  app.locals.setSettings = setSettings(app);
};

module.exports = settings;
