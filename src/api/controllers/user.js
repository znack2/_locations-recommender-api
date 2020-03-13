const models = require('../../models');

module.exports = {
  getUser: async (req, res, next) => {
    try {
      const { userId } = req.session;

      const user = await models.users.findOne({ id: userId });

      res.json(user);
    } catch (error) {
      return next(error);
    }
  }
};
