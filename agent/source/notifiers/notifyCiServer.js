const instance = require('../axiosInstance');

const setNotifierInterval = (host, port) => {
  const interval = setInterval(() => {
    console.log('\nПопытка уведомить сервер о существовании агента...');
    instance
      .post('/notify-agent', { host, port })
      .then(() => {
        console.log('=> ...сервер уведомлен о существовании агента');
        clearInterval(interval);
      })
      .catch(() => {
        console.log('=> ...неудачная попытка, попробуем ещё через 30 сек!');
      });
  }, 30000);
};

const notifyCiServer = ({ host, port }) => {
  console.log('\nПопытка уведомить сервер о существовании агента...');
  instance
    .post('/notify-agent', { host, port })
    .then(() => {
      console.log('=> ...сервер уведомлен о существовании агента');
    })
    .catch(() => {
      console.log('=> ...неудача, попробуем ещё через 30 сек!');
      setNotifierInterval(host, port);
    });
};

module.exports = notifyCiServer;
