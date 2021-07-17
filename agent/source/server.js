const express = require('express');
require('dotenv').config();

const { port } = require('../agent-conf.json');

const { buildHandler, buildStatusHandler } = require('./controllers/build');

const applyMiddlewares = require('./applyMiddlewares');
const setLocalValues = require('./setLocalValues');
const notifyCiServer = require('./notifiers/notifyCiServer');

// let accessPort;
// console.log(process.argv);
// process.argv.forEach((val) => {
//   if (val.split('=')[0] === 'port') {
//     accessPort = val.split('=')[1];
//   }
// });

if (!port) {
  console.log('порт не передан');
} else {
  console.log(`Агент будет доступен по порту ${port}`);
}

const app = express();
applyMiddlewares(app);

const host = '127.0.0.1';
setLocalValues(app, { host, port });

app.get('*', (req, res) => {
  res.send({ status: 404 });
});

app.get('/buildStatus', buildStatusHandler(app.locals.getBuildStatus));

app.post(
  '/build',
  buildHandler(app.locals.agentInfo, app.locals.setSettings, app.locals.setBuildStatus)
);

app.listen(port, () => {
  console.log(`Server has started at port ${port}`);

  notifyCiServer({ host, port });
});
