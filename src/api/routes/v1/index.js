const express = require("express");
const authChecker = require('../../middlewares/auth');

const controllers = {
  auth: require('../../controllers/auth'),
  user: require('../../controllers/user'),
  recommendation: require('../../controllers/recommendation'),
  rate: require('../../controllers/rate')
};

const router = express.Router();

router.post('/login', controllers.auth.login);
router.post('/logout', [authChecker, controllers.auth.logout]);

router.get('/user', [authChecker, controllers.user.getUser]);
router.get('/user/preferences', [authChecker, controllers.user.getUserPreferences]);
router.post('/user/preferences', [authChecker, controllers.user.addUserPreference]);
router.delete('/user/preferences', [authChecker, controllers.user.removeUserPreferences]);

router.get('/recommendation', [authChecker, controllers.recommendation.getRecommendation]);
router.post('/recommendation/skip', [authChecker, controllers.recommendation.skipRecommendation]);
router.post('/recommendation/select', [authChecker, controllers.recommendation.selectRecommendation]);

router.post('/rate/rate', [authChecker, controllers.rate.rate]);
router.post('/rate/get', [authChecker, controllers.rate.get]);
router.post('/rate/remove', [authChecker, controllers.rate.remove]);

module.exports = router;


