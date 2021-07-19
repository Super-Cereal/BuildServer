/* eslint-disable consistent-return */
const { exec } = require('./fs');

const buildProccess = async ({ commitHash, buildCommand }) => {
  console.log('\n=> Начало билда');

  await exec(`cd data/Repository && git checkout ${commitHash}`);

  console.log(`=> => Начало исполнения команды ${buildCommand}`);
  console.time('=> => => длительность билда');
  const response = await exec(`cd data/Repository && ${buildCommand}`);
  console.timeEnd('=> => => длительность билда');

  const result = response.stderr
    ? { status: 1, buildLog: response.stderr }
    : { status: 0, buildLog: response.stdout };

  console.log(`=> => => ...билд завершен с результатом ${JSON.stringify(result)}`);
  return result;
};

module.exports = buildProccess;
