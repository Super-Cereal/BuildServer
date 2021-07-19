// req.body = { buildId }
const startBuild = (buildsQueue) => async (req, res) => {
  console.log('\nПроизошел запрос на /startBuild');
  try {
    console.log(`=> Добавление билда (buildID: ${req.body.buildId}; commitHash: ${req.body.commitHash}) в очередь...`);
    buildsQueue.push({buildId: req.body.buildId, commitHash: req.body.commitHash});
    console.log('=> => ...успешно');

    res.send({ status: 200 });
  } catch (e) {
    console.log('=> Ошибка - ');
    console.log(`=> => ${e}`);

    res.send({ status: 400, error: e });
  }
};

module.exports = {
  startBuild,
};
