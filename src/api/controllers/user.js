const models = require('../../models');
const ApiError = require('../errors/ApiError');

module.exports = {
  getUser: async (req, res, next) => {
    try {
      const { userId } = req.session;

      const user = await models.users.findOne({ id: userId });

      res.json(user);
    } catch (error) {
      return next(error);
    }
  },
  getUserPreferences: async (req, res, next) => {
    try {
      const { userId } = req.session;

      const preferences = await models.userPreferences.find({ userId }, ['preference'])
        .then(preferences => preferences.map(({ preference }) => preference));

      res.json(preferences);
    } catch (error) {
      return next(error);
    }
  },
  addUserPreference: async (req, res, next) => {
    try {
      const { userId } = req.session;
      const { preference } = req.body;

      if (!preference || typeof preference !== 'string') {
        throw new ApiError('INVALID_PREFERENCE');
      }

      if (await models.userPreferences.exists({ userId, preference })) {
        throw new ApiError('PREFERENCE_ALREADY_EXISTS');
      }

      const userPreference = await models.userPreferences.create({ userId, preference });

      res.json(userPreference);
    } catch (error) {
      return next(error);
    }
  },
  removeUserPreference: async (req, res, next) => {
    try {
      const { userId } = req.session;
      const { preference } = req.body;

      if (!preference || typeof preference !== 'string') {
        throw new ApiError('INVALID_PREFERENCE');
      }

      if (!(await models.userPreferences.exists({ userId, preference }))) {
        throw new ApiError('PREFERENCE_DOESNT_EXIST');
      }

      const [userPreference] = await models.userPreferences.delete({ userId, preference }, '*');

      res.json(userPreference);
    } catch (error) {
      return next(error);
    }
  },
};
