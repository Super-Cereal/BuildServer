const buildProccess = require('../utils/childProccess/buildProccess');
const notifyBuildIsReady = require('../notifiers/notifyBuildIsReady');

// req.body = { buildId, repoName, commitHash, buildCommand }
const buildHandler =
  ({ host, accessPort }, setSettings, setBuildStatus) =>
  async (req) => {
    console.log(`Начался билд ${JSON.stringify(req.body)}...`);

    const { buildId, repoName, commitHash, buildCommand } = req.body;

    setBuildStatus('setuping');
    await setSettings({ repoName, buildCommand });

    const startTimestamp = new Date();
    setBuildStatus('active');
    const res = await buildProccess({ commitHash, buildCommand });
    setBuildStatus('finished');

    notifyBuildIsReady(
      {
        buildId,
        status: res.status !== 0 ? 'failed' : 'success',
        buildLog: res.buildLog,
        duration: new Date() - startTimestamp,
      },
      { host, accessPort }
    );

    console.log('...процесс билда завершен');
  };

const buildStatusHandler = (getBuildStatus) => async (_, res) => {
  res.send({ status: 200, data: getBuildStatus() });
};

module.exports = {
  buildHandler,
  buildStatusHandler,
};
