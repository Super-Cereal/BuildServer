const buildStatus = (app) => {
  const setBuildStatus = (app, validStatuses) => (status) => {
    if (!validStatuses.includes(status)) {
      throw Error(`Status ${status} is not valid`);
    }
    app.locals._buildStatus = status;
  };

  const getBuildStatus = (app) => () => app.locals._buildStatus;

  const validStatuses = ['unactive', 'setuping', 'active', 'finished'];
  app.locals._buildStatus = 'unactive';
  app.locals.setBuildStatus = setBuildStatus(app, validStatuses);
  app.locals.getBuildStatus = getBuildStatus(app);
};

module.exports = buildStatus;
