const express = require("express");
const ApiError = require('../errors/ApiError');
const v1 = require('./v1');

const router = express.Router();

router.use('/v1', v1);
router.use('/', (req, res, next) => {
  return next(new ApiError('NOT_IMPLEMENTED'));
});

module.exports = router;