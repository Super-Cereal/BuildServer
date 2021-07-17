const axios = require('axios');

const { API_BASE_URL } = require('../../../server-conf.json');

const instance = axios.create({
  withCredentials: true,
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.apiToken}`,
  },
});

module.exports = instance;
