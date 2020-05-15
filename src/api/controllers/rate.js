const models = require('../../models');
const ApiError = require('../errors/ApiError');

module.exports = {
  get: async (req, res, next) => {
    try {
      const { userId } = req.session;
      const { locationId } = req.body;

      const rating = await models.ratings.find({ userId }, locationId);

      res.json(rating);
    } catch (error) {
      return next(error);
    }
  },  
  getUser: async (req, res, next) => {
    try {
      const { userId } = req.session;

      const rating = await models.ratings.find({ userId })
        .then(preferences => preferences.map(({ preference }) => preference));

      res.json(rating);
    } catch (error) {
      return next(error);
    }
  },
  rate: async (req, res, next) => {
    try {
      const { userId } = req.session;
      const { locationId, value } = req.body;

      if (!locationId || typeof locationId !== 'string') {
        throw new ApiError('INVALID_PREFERENCE');
      }

      if (await models.ratings.exists({ userId, locationId })) {
        throw new ApiError('PREFERENCE_ALREADY_EXISTS');
      }

      const rating = await models.ratings.create({ userId, locationId });

      res.json(rating);
    } catch (error) {
      return next(error);
    }
  },  
  remove: async (req, res, next) => {
    try {
      const { userId } = req.session;
      const { locationId } = req.body;


      if (!locationId || typeof locationId !== 'string') {
        throw new ApiError('INVALID_PREFERENCE');
      }

      if (!(await models.ratings.exists({ userId, locationId }))) {
        throw new ApiError('PREFERENCE_DOESNT_EXIST');
      }

      const [rating] = await models.ratings.delete({ userId, locationId }, '*');

      res.json(rating);
    } catch (error) {
      return next(error);
    }
  },
};
