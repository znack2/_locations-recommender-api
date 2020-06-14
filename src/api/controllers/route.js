const ApiError = require('../errors/ApiError');
const request = require('request');
const models = require('../../models');

module.exports = {
  getRoute: async (req, res, next) => {
    try {
      const {userId} = req.session;
      const user = await models.users.findOne({id: userId});
      const url = 'https://moscow-walks.forcode.pro/react_admin/api/places_bot_plugin/routeplace/?route=' + user.current_route_id;
      const headers = {
        authorization: 'Token 97133dfe9195453d8bf9edd71bcfe4d08df803df'
      };
      await request.get({url, headers}, (error, response, body) => {
        const result = JSON.parse(body);
        return res.status(200).json(result);
      });
    } catch (error) {
      next(error);
    }
  },
};