const {
  CHECK_AVAILABLE_AGENTS_PERIOD,
  CHECK_AGENT_BUILD_PROGRESS_PERIOD,
} = require('../server-conf.json');
const watchBuilds = require('./utils/watchBuilds');
const AgentsConsole = require('./agents/AgentsConsole');
const getSettings = require('./utils/swagger/getSettings');

const setLocalValues = (app) => {
  app.locals.buildsQueue = [];

  app.locals._syncPeriod = -1;
  app.locals.setSyncPeriod = (period) => {
    app.locals._syncPeriod = period && period > 0 ? period : -1;
  };

  app.locals.agentsConsole = new AgentsConsole(
    CHECK_AGENT_BUILD_PROGRESS_PERIOD,
    app.locals.buildsQueue
  );
  app.locals.agentsConsole.saveSettings({});
  getSettings().then((res) => {
    const data = res.status === 200 && res.haveSettings ? res.data : {};
    app.locals.agentsConsole.saveSettings(data);
    app.locals._syncPeriod = app.locals.setSyncPeriod(data.period);
  });

  // по дефолту каждые 2 минуты скрипт будет проверять наличие незанятого агента для билда
  watchBuilds(
    { buildsQueue: app.locals.buildsQueue, agentsConsole: app.locals.agentsConsole },
    CHECK_AVAILABLE_AGENTS_PERIOD
  );
};

module.exports = setLocalValues;
