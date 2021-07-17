// req.body = { buildId }
const startBuild = (buildsQueue) => async (req, res) => {
  console.log('\nПроизошел запрос на /startBuild');
  try {
    console.log(`\tДобавление билда (buildID: ${req.body.buildId}; commitHash: ${req.body.commitHash}) в очередь...`);
    buildsQueue.push({buildId: req.body.buildId, commitHash: req.body.commitHash});
    console.log('\t\t...успешно');

    res.send({ status: 200 });
  } catch (e) {
    console.log('\tОшибка - ');
    console.log(`\t\t${e}`);

    res.send({ status: 400, error: e });
  }
};

module.exports = {
  startBuild,
};
