const axios = require('axios');

const build = async ({
  agent,
  buildData: { buildId, repoName, commitHash, buildCommand },
  restoreBuild,
}) => {
  const baseUrl = `http://${agent.host}:${agent.port}`;

  const response = await axios
    .post(`${baseUrl}/build`, { buildId, repoName, commitHash, buildCommand })
    .then((res) => {
      console.log(res.data);
      return { status: res.status, data: res.data.data };
    })
    .catch(() => {
      restoreBuild();
    });
  return response;
};

module.exports = build;
