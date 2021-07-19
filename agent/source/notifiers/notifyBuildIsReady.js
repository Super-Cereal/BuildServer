const instance = require('../axiosInstance');

const notifyBuildIsReady = async (buildResults, { host, accessPort }) => {
  console.log('=> Посылаем результат билда на сервер, ожидаем ответа...');

  await instance.post('/notify-build-result', {
    result: buildResults,
    agent: { host, port: accessPort },
  });

  console.log('=> => ...результаты приняты');
};

module.exports = notifyBuildIsReady;
