const startBuild = require('./swagger/startBuild');
const build = require('../agents/build');

const handleBuildStart = async (agent, buildData, restoreBuild) => {
  await startBuild({ buildId: buildData.buildId, dateTime: new Date().toISOString() });
  build({ agent, buildData, restoreBuild });
};

const watchBuilds = ({ buildsQueue, agentsConsole }, period = 2) => {
  // ставит интервал с проверкой на существование свободного агента для билда из очереди

  return setInterval(async () => {
    console.log('\nПопытка начать билды');
    await agentsConsole.killUnvailableAgents();

    const agents = agentsConsole.getFreeAgents();

    let agent, restoreBuild, buildData;
    while (buildsQueue.length && agents.length) {
      const { buildId, commitHash } = buildsQueue.shift();
      buildData = { buildId, commitHash, ...agentsConsole.getSettings() };

      [agent, restoreBuild] = agentsConsole.takeAgent(agents.shift(), buildData);
      handleBuildStart(agent, buildData, restoreBuild);

      console.log(`=> ...начат билд в агенте ${agent.host}:${agent.port}`);
    }
    console.log(`=> ...билдов в очереди - ${buildsQueue.length}`);
  }, period * 60000);
};

module.exports = watchBuilds;
