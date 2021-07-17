const finishBuild = require('../utils/swagger/finishBuild');

// req.body = { host, port }
const notifyAgent = (agentsConsole) => async (req, res) => {
  console.log('\nПроизошел запрос на /notify-agent');
  try {
    const { host, port } = req.body;
    agentsConsole.addAgent({ host, port });
    console.log('\tАгент зарегестрирован');
    res.send({ status: 200 });
  } catch (e) {
    console.log('\tАгент не зарегестрирован - ошибка:');
    console.log(`\t\t${e}`);
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
    console.log('\tАгент освобожден');

    res.send({ status: 200 });
  } catch (e) {
    console.log('\tАгент не освобожден - ошибка:');
    console.log(`\t\t${e}`);
    res.send({ status: 400, error: e });
  }
};

module.exports = {
  notifyAgent,
  notifyBuildResult,
};
