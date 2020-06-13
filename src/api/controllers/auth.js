const models = require('../../models');
const instagram = require('../../services/instagram');
const ApiError = require('../errors/ApiError');

module.exports = {
  oauthlogin: async (req, res, next) => {
    try {
      const code = req.body && req.body.code ? req.body.code.replace(/#_$/, '') : undefined;
      if (!code) {
        throw new ApiError('AUTHORIZATION_CODE_REQUIRED');
      }

      const accessToken = await instagram.getAccessToken(code);
      if (!accessToken) {
        throw new ApiError('INVALID_AUTHORIZATION_CODE');
      }

      const instagramUser = await instagram.getUser(accessToken);
      let dbUser = await models.users.create(instagramUser, '*', {onConflictIgnore: true});
      if (!dbUser) {
        [dbUser] = await models.users.update({id: instagramUser.id}, {username: instagramUser.username});
      }
      if (!dbUser) {
        throw new ApiError('INTERNAL_ERROR');
      }

      const session = await models.sessions.create({userId: dbUser.id});

      res.json(session);
    } catch (error) {
      return next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      console.log('login');
      // const username = req.body && req.body.username ? req.body.username : undefined;
      // const password = req.body && req.body.password ? req.body.password : undefined;

      // if (!username && !password) {
      //   throw new ApiError('USERNAME_AND_PASSWORD_REQUIRED');
      // }

      const {route_id, name, age, type_emotion, target, preference} = req.body;

      console.log('route_id', route_id)

      if (!route_id) {
        throw new ApiError('AUTHORIZATION_ROUTE_ID_REQUIRED');
      }

      if ((!name || typeof name !== 'string')
          || (!age || !Number.isInteger(age))
          || (!type_emotion || !Number.isInteger(type_emotion))
          || (!target || !Number.isInteger(target))
          || (!preference || typeof preference !== 'string')) {
        return res.json({message: "Wrong name,age,type_emotion, preference or target"});
      }

      const user = {
        id: Math.floor(Math.random() * 5000),//Date.now(),
        username: '_' + Math.random().toString(36).substr(2, 9),
        current_route_id: route_id,
        name,
        age,
        type_emotion,
        target
      };

      let dbUser = await models.users.create(user, '*', {onConflictIgnore: true});
      const userPreference = await models.userPreferences.create({ userId: dbUser.id, preference });

      // var userId = dbUser.id
      // var preference = ['ресторан','музей','клуб']

      // preference.map(preference => models.userPreferences.create({ userId, preference }));

      if (!dbUser) {
        [dbUser] = await models.users.update({id: user.id}, {username: user.username});
      }
      if (!dbUser) {
        throw new ApiError('INTERNAL_ERROR');
      }

      const session = await models.sessions.create({userId: dbUser.id});

      res.json(session);
    } catch (error) {
      return next(error);
    }
  },
  logout: async (req, res, next) => {
    try {
      const accessToken = req.get('Access-Token');

      const [session] = await models.sessions.update({accessToken}, {active: false});

      res.json(session);
    } catch (error) {
      return next(error);
    }
  }
};
