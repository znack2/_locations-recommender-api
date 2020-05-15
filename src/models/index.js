const { getDb } = require('../utils/db');

const generateModel = (table) => ({
  create: async (data, returning = '*', options = {}) => {
    const db = getDb();

    const { onConflictIgnore = false } = options;

    let query = db
      .table(table)
      .insert(data, returning);
    if (onConflictIgnore) {
      if (returning) {
        query = db
          .raw(query.toString().replace(' returning', ' on conflict do nothing returning'))
          .then((result) => result.rows);
      } else {
        query = db.raw(`${query.toString()} on conflict do nothing`).then((result) => result.rows);
      }
    }

    return Array.isArray(data) ? query : query.then((result) => result[0]);
  },
  update: async (where = {}, data, returning = '*') => {
    const db = getDb();

    return db
      .table(table)
      .update(data, returning)
      .where(where);
  },
  find: async (where = {}, columns = '*', orderBy = [], limit = null) => {
    const db = getDb();

    let promise = db
      .table(table)
      .select(columns)
      .where(where)
      .orderBy(orderBy);

    if (limit) {
      promise = promise.limit(limit);
    }

    return promise;
  },
  findOne: async (where = {}, columns = '*', orderBy = []) => {
    const db = getDb();

    return db
      .table(table)
      .first(columns)
      .where(where)
      .orderBy(orderBy);
  },
  async exists(...params) {
    return Boolean(await this.findOne(...params));
  },
  count: async (where = {}, columns = '*') => {
    const db = getDb();

    return db
      .table(table)
      .count(columns)
      .where(where)
      .then((result) => parseInt(result[0].count, 10));
  },
  delete: async (where = {}, returning) => {
    const db = getDb();

    return db
      .table(table)
      .delete(returning)
      .where(where);
  }
});

module.exports = {
  users: generateModel('users'),
  sessions: generateModel('sessions'),
  ratings: generateModel('ratings'),
  userPreferences: generateModel('userPreferences')
};
