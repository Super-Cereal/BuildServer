const instance = require('../axiosInstance');

const notifyBuildIsReady = async (buildResults, { host, accessPort }) => {
  console.log(
    `\tПосылаем результат билда ${JSON.stringify(buildResults)} на сервер, ожидаем ответа...`
  );

  await instance.post('/notify-build-result', {
    result: buildResults,
    agent: { host, port: accessPort },
  });

  console.log('\t\t...результаты приняты');
};

module.exports = notifyBuildIsReady;
