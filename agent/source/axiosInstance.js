const axios = require('axios');

const { serverHost, serverPort } = require('../agent-conf.json');

const instance = axios.create({
  withCredentials: true,
  baseURL: `http://${serverHost}:${serverPort}`,
});

module.exports = instance;
