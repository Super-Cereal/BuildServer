const instance = require('./instance');

const startBuild = async ({ buildId, dateTime }) => {
  const response = await instance
    .post('/build/start', { buildId, dateTime })
    .then((res) => ({ status: res.status, data: res.data.data }))
    .catch((e) => {});
  return response;
};

module.exports = startBuild;
