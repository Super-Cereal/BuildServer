const instance = require('./instance');

const finishBuild = async ({ buildId, duration, status, buildLog }) => {
  console.log('\tУведомляем swagger о завершенном билде...');

  const finishData = { buildId, duration, success: status === 'success', buildLog };
  console.log(finishData);
  await instance
    .post('/build/finish', finishData)
    .then((res) => {
      console.log('\t\tswagger => then');
      return { status: res.status, data: res.data.data };
    })
    .catch((err) => {
      console.log('\t\tswagger => catch');

      return { status: 400, data: err };
    });

  console.log('\t\t...swagger уведомлен');
};

module.exports = finishBuild;
