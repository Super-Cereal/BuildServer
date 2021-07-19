const settings = require('./settings');
const buildStatus = require('./buildStatus');

const setLocalValues = (app, { host, accessPort }) => {
  app.locals.agentInfo = { host, accessPort };

  settings(app);
  buildStatus(app);
};

module.exports = setLocalValues;
