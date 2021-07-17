const express = require('express');
require('dotenv').config();

const { SERVER_PORT } = require('../server-conf.json');
const applyMiddlewares = require('./applyMiddlewares');
const setLocalValues = require('./setLocalValues');

const { notifyAgent, notifyBuildResult } = require('./controllers/agentNotifiers');
const { startBuild } = require('./controllers/builds');
const { setRepoSettings } = require('./controllers/setup');

const app = express();
applyMiddlewares(app);

setLocalValues(app);

app.post('/updateRepoSettings', setRepoSettings(app.locals.agentsConsole, app.locals.setSyncPeriod));

app.post('/startBuild', startBuild(app.locals.buildsQueue));

app.post('/notify-agent', notifyAgent(app.locals.agentsConsole));

app.post('/notify-build-result', notifyBuildResult(app.locals.agentsConsole));

app.listen(SERVER_PORT, () => {
  console.log(`Server has started at port ${SERVER_PORT}`);
});
