const config = require('config');
const knex = require('knex');
const retry = require('p-retry');

const knexConfig = config.get('knex');
const dbConnectionConfig = config.get('db');

const onDbConnectionAttemptFailed = (error) => {
  console.warn(
    `Connecting to the database. Attempt #${error.attemptNumber} failed. There are ${
      error.retriesLeft
    } retries left. ${new Date()}`,
    error
  );
};
const onDbConnectionFailed = (errorMessage) => (error) => {
  console.error(errorMessage, error);
  console.info('Exiting...');

  process.exit(1);
};
const checkDbConnection = (db) => db.select(db.raw('true'));

let _db;
const initDb = async () => {
  const getKnexPromise = async () => {
    let poolActiveConnectionsCounter = 0;

    const db = knex({
      ...knexConfig,
      pool: {
        ...knexConfig.pool,
        afterCreate: (connection, done) => {
          poolActiveConnectionsCounter += 1;

          connection.on('end', () => {
            poolActiveConnectionsCounter -= 1;
          });

          connection.on('error', (error) => {
            if (poolActiveConnectionsCounter <= 1) {
              onDbConnectionFailed('Connection to the database ended unexpectedly')(error);
            }
          });

          done(null, connection);
        }
      },
      connection: dbConnectionConfig
    });

    await checkDbConnection(db);

    return db;
  };

  _db = await retry(() => getKnexPromise(), {
    ...config.get('dbRetry'),
    onFailedAttempt: onDbConnectionAttemptFailed
  }).catch(onDbConnectionFailed("Connection to the database couldn't be established"));
};
const getDb = () => {
  if (!_db) {
    throw Error('DB has not been initialized yet');
  }

  return _db;
};

module.exports = {
  initDb,
  getDb
};
