const startBuild = require('./swagger/startBuild');
const build = require('../agents/build');
const finishBuild = require('./swagger/finishBuild');

const handleBuildStart = async (agent, buildData, restoreBuild) => {
  const start = new Date();

  await startBuild({ buildId: buildData.buildId, dateTime: start.toISOString() });
  const response = await build({ agent, buildData, restoreBuild });

  const finish = new Date();
  await finishBuild({ ...response, duration: finish - start });
};

const watchBuilds = ({ buildsQueue, agentsConsole }, period = 2) => {
  // ставит интервал с проверкой на существование свободного агента для билда из очереди

  return setInterval(async () => {
    await agentsConsole.killUnvailableAgents();

    const agents = agentsConsole.getFreeAgents();

    let agent, restoreBuild, buildData;
    while (buildsQueue.length && agents.length) {
      const { buildId, commitHash } = buildsQueue.pop();
      buildData = { buildId, commitHash, ...agentsConsole.getSettings() };

      [agent, restoreBuild] = agentsConsole.takeAgent(agents.pop(), buildData);
      handleBuildStart(agent, buildData, restoreBuild);
    }
  }, period * 60000);
};

module.exports = watchBuilds;
