const { json } = require('express');
const cors = require('cors');

const { port } = require('../agent-conf.json');

const disablePoweredBy = (_, res, next) => {
  res.removeHeader('X-Powered-By');
  next();
};

const corsOptions = {
  origin: `http://localhost:${port}`,
  credentials: true,
  optionSuccessStatus: 200,
};

module.exports = (app) => {
  app.use(cors(corsOptions));
  app.use(json());
  app.use(disablePoweredBy);
};
