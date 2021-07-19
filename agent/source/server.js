const express = require('express');
require('dotenv').config();

const { port, host } = require('../agent-conf.json');

const { buildHandler, buildStatusHandler } = require('./controllers/build');

const applyMiddlewares = require('./applyMiddlewares');
const setLocalValues = require('./setLocalValues/setLocalValues');
const notifyCiServer = require('./notifiers/notifyCiServer');

const accessPort = process.env.PORT || port;
console.log(`Агент будет доступен по порту ${accessPort}`);

const app = express();
applyMiddlewares(app);

setLocalValues(app, { host, accessPort });

app.get('*', (_, res) => {
  res.send({ status: 404 });
});

app.get('/buildStatus', buildStatusHandler(app.locals.getBuildStatus));

app.post(
  '/build',
  buildHandler(app.locals.agentInfo, app.locals.setSettings, app.locals.setBuildStatus)
);

app.listen(port, () => {
  console.log(`Server has started at port ${port}`);

  notifyCiServer({ host, port: accessPort });
});
