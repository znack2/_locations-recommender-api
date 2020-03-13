module.exports = {
  app: {
    port: 3000
  },

  db: {
    user: 'postgres',
    host: 'locations-recommender-db',
    database: 'locations_recommender',
    password: 'password',
    port: 5432
  },

  knex: {
    client: 'pg',
    debug: false,
    pool: {
      min: 1,
      max: 30
    },
    acquireConnectionTimeout: 5000
  },

  dbRetry: {
    maxTimeout: 5000,
    minTimeout: 5000,
    retries: 4
  },

  connections: {
    instagram: {
      clientId: '476859443194257',
      clientSecret: 'cf981078ea609a35392daa5ae65f8aca',
      clientRedirectUri: 'https://freshplan.ru/callback'
    }
  }
};