/* eslint-disable consistent-return */
const { exec } = require('../fs');

module.exports = async () => {
  console.log('started installing requirements');
  console.time('requirements installed');
  await exec('cd ./data/Repository && npm ci');
  console.timeEnd('requirements installed');

  return { status: 200 };
};
