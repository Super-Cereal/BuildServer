const axios = require('axios');

const FREE = 'FREE';
const BUZY = 'BUZY';

class AgentsConsole {
  constructor(period, buildsQueue) {
    this._agents = [];
    this._settings = {};
    this._buildsQueue = buildsQueue;

    this._newAgentId = 1;
    this._watchPeriod = period;
  }

  saveSettings({ repoName, buildCommand, mainBranch }) {
    this._settings = { repoName, buildCommand, mainBranch };
  }

  getSettings() {
    return this._settings;
  }

  getAgents() {
    return this._agents;
  }

  getFreeAgents() {
    return this._agents.filter((agn) => agn._status === FREE);
  }

  getBuzyAgents() {
    return this._agents.filter((agn) => agn._status === BUZY);
  }

  addAgent({ host, port }) {
    console.log(`\tДобавление агента в базу (host: ${host}; port: ${port})...`);

    this._agents.forEach((agn) => {
      if (agn.port === port && agn.host === host) {
        throw Error(`Агент с host ${host} и port ${port} уже зарегестрирован`);
      }
    });

    const agentData = { id: this._newAgentId, _status: FREE, _watcher: null, host, port };

    this._agents.push(agentData);
    this._newAgentId += 1;

    console.log(`\t\t...успешно (host: ${agentData.host}; port: ${agentData.port})`);
  }

  __watchAgent(agent, period, restoreBuild) {
    return setInterval(() => {
      axios.get(`http://${agent.host}:${agent.port}/buildStatus`).catch(() => {
        restoreBuild();
      });
    }, period * 60000);
  }

  __removeAgent(agent) {
    let found = false;
    console.log(`\t\tУдаление агента (host: ${agent.host}; port: ${agent.port}) из базы...`);
    this._agents = this._agents.filter((agn) => {
      if (agn.id === agent.id) {
        found = true;
        clearInterval(agn._watcher);
        return false;
      }
      return true;
    });
    if (!found) {
      console.warn(`\t\t\tагент (host: ${agent.host}; port: ${agent.port}) не найден`);
    }
    console.log(`\t\t\t...успешно (host: ${agent.host}; port: ${agent.port})`);
  }

  takeAgent(agent, { buildId, commitHash }) {
    if (agent._status === BUZY) throw Error('You tried to take buzy agent');
    const restoreBuild = () => this._buildsQueue.push({ buildId, commitHash });

    agent._watcher = this.__watchAgent(agent, this._watchPeriod, restoreBuild);
    agent._status = BUZY;
    return [agent, restoreBuild];
  }

  freeAgent(agent) {
    console.log(`\tОсвобождение агента (host: ${agent.host}; port: ${agent.port})...`);

    let found = false;

    this._agents.forEach((agn) => {
      if (`${agn.host}:${agn.port}` === `${agent.host}:${agent.port}`) {
        found = true;
        clearInterval(agn._watcher);
        agn._watcher = null;

        if (agn._status === FREE) {
          console.warn(`\t\tагент (host: ${agn.host}; port: ${agn.port}) уже свободен`);
        }
        console.log(`\t\t...успешно (host: ${agn.host}; port: ${agn.port})`);
        agn._status = FREE;
      }
    });
    if (!found) throw Error(`Агент c id ${agent.id} не найден`);
  }

  killAgent(agent) {
    // требует доработки
    // необходимо глушить агент, если он еще не помер от ошибок
    this.__removeAgent(agent);
    return this._agents;
  }

  __checkAgentAvailability(agent) {
    return axios
      .get(`http://${agent.host}:${agent.port}`)
      .then(() => ({ available: true, agent }))
      .catch(() => ({ available: false, agent }));
  }

  killUnvailableAgents() {
    console.log('\nНачалась проверка на доступность агентов...');

    const func = (resolve) => {
      const agents = this.getFreeAgents();
      let uncheckedAgents = agents.length;
      if (!uncheckedAgents) {
        console.log(`\t...свободных агентов нет, занятых - ${this.getBuzyAgents().length}`);
        return;
      }

      agents.forEach(async (agn) => {
        const res = await this.__checkAgentAvailability(agn);

        if (!res.available) {
          console.log(`\tАгент (host: ${agn.host}; port: ${agn.port}) недоступен`);

          this.killAgent(res.agent);
        }

        uncheckedAgents -= 1;
        if (uncheckedAgents === 0) {
          console.log(
            `\t...проверка на доступность агентов завершена,\tсвободных агентов - ${
              this._agents.length
            },\tзанятых агентов - ${this.getBuzyAgents().length}`
          );
          resolve();
        }
      });
    };
    func.bind(this);
    return new Promise(func);
  }
}

module.exports = AgentsConsole;
