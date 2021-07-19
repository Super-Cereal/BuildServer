const axios = require('axios');

const build = ({
  agent,
  buildData: { buildId, repoName, commitHash, buildCommand },
  restoreBuild,
}) => {
  const baseUrl = `http://${agent.host}:${agent.port}`;

  axios
    .post(`${baseUrl}/build`, { buildId, repoName, commitHash, buildCommand })
    .then((res) => {
      console.log(res.data);
      return { status: res.status, data: res.data.data };
    })
    .catch(() => {
      restoreBuild();
    });
};

module.exports = build;
