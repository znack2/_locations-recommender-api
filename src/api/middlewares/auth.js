const models = require('../../models');
const ApiError = require('../errors/ApiError');

module.exports = async (req, res, next) => {
  try {
    const accessToken = req.get('Access-Token');

    if (accessToken) {
      const session = await models.sessions.findOne({ accessToken });
      if (session && session.active) {
        req.session = {
          userId: session.userId
        };

        return next();
      }
    }

    next(new ApiError('AUTHORIZATION_REQUIRED'));
  } catch (error) {
    next(error);
  }
};