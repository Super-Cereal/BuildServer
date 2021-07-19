// req.body = { repoName, buildCommand, mainBranch, period }
const setRepoSettings = (agentsConsole, setSyncPeriod) => async (req, res) => {
  console.log('\nПроизошел запрос на /updateRepoSettings');
  try {
    const { repoName, buildCommand, mainBranch, period } = req.body;
    console.log(
      `=> Сохранение настроек (repoName: ${repoName}, buildCommand: ${buildCommand}, mainBranch: ${mainBranch}, period: ${period})...`
    );
    agentsConsole.saveSettings({ repoName, buildCommand, mainBranch });
    setSyncPeriod(period);
    console.log('=> => ...успешно');
    res.send({ status: 200 });
  } catch (e) {
    console.log('=> Ошибка -');
    console.log(`=> => ${e}`);
    res.send({ status: 400, error: e });
  }
};

module.exports = {
  setRepoSettings,
};
