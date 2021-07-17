const instance = require('./instance');

const getSettings = () => {
  return instance
    .get('/conf')
    .then((response) => ({
      status: response.status,
      data: response.data.data || {},
      haveSettings: !!response.data.data,
    }))
    .catch((error) => ({ status: 500, data: error }));
};

module.exports = getSettings;
