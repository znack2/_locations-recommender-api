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

module.exports = router;