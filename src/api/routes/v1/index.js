const express = require("express");
const authChecker = require('../../middlewares/auth');

const controllers = {
  auth: require('../../controllers/auth'),
  user: require('../../controllers/user')
};

const router = express.Router();

router.post('/login', controllers.auth.login);
router.post('/logout', [authChecker, controllers.auth.logout]);

router.get('/user', [authChecker, controllers.user.getUser]);
router.get('/user/preferences', [authChecker, controllers.user.getUserPreferences]);
router.post('/user/preferences', [authChecker, controllers.user.addUserPreference]);
router.delete('/user/preferences', [authChecker, controllers.user.removeUserPreference]);

module.exports = router;