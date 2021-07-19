const finishBuild = require('../utils/swagger/finishBuild');

// req.body = { host, port }
const notifyAgent = (agentsConsole) => async (req, res) => {
  console.log('\nПроизошел запрос на /notify-agent');
  try {
    const { host, port } = req.body;
    agentsConsole.addAgent({ host, port });
    console.log('=> Агент зарегестрирован');
    res.send({ status: 200 });
  } catch (e) {
    console.log('=> Агент не зарегестрирован - ошибка:');
    console.log(`=> => ${e}`);
    res.send({ status: 400, error: e });
  }
};

// req.body = {
//      agent: { id, host, port },
//      result: { buildId, status, buildLog, duration }
// }
const notifyBuildResult = (agentsConsole) => async (req, res) => {
  console.log('\nПроизошел запрос на /notify-build-result');
  try {
    const { agent, result } = req.body;
    console.log(agent, result);
    const { buildId, status, buildLog, duration } = result;

    finishBuild({ buildId, status, buildLog, duration });

    agentsConsole.freeAgent(agent);
    console.log('=> Агент освобожден');

    res.send({ status: 200 });
  } catch (e) {
    console.log('=> Агент не освобожден - ошибка:');
    console.log(`=> => ${e}`);
    res.send({ status: 400, error: e });
  }
};

module.exports = {
  notifyAgent,
  notifyBuildResult,
};
