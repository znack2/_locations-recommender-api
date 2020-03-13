const config = require('config');
const request = require('superagent');

const clientId = config.get('connections.instagram.clientId');
const clientSecret = config.get('connections.instagram.clientSecret');
const clientRedirectUri = config.get('connections.instagram.clientRedirectUri');

module.exports = {
  getAccessToken: async (code) => {
    try {
      const { body: { access_token: accessToken } } = await request
        .post(`https://api.instagram.com/oauth/access_token`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'authorization_code',
          redirect_uri: clientRedirectUri,
          code
        });

      return accessToken;
    } catch (error) {
      return null;
    }
  },
  getUser: async (accessToken) => {
    try {
      const { body } = await request
        .get(`https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`);

      return body;
    } catch (error) {
      return null;
    }
  }
};
