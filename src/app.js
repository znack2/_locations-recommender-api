const { initDb } = require('./utils/db');
const { runServer } = require('./api');

const initApp = async () => {
  await initDb();

  return runServer();
};

process.on('uncaughtException', (err) => {
  console.error('uncaughtException', err);
  if (['EMFILE', 'EADDRINUSE', 'EACCES']) {
    process.exit(1);
  }
});

process.on('unhandledRejection', (err) => {
  console.error('unhandledRejection', err);
});

initApp()
  .then((server) => {
    console.info(`Server is up and running on port ${server.address().port}`);
  })
  .catch((error) => {
    console.error('Couldn\'t initialize the server', error);
    process.exit(1);
  });