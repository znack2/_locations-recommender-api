const ApiError = require('../errors/ApiError');
const { INTERNAL_ERR0R } = require('../errors/errorsByCodes');

module.exports = (error, req, res, next) => {
  if (error instanceof ApiError) {
    res.status(error.statusCode);
    res.json(error.data);
  } else {
    console.error(error);

    res.status(INTERNAL_ERR0R.statusCode);
    res.json(INTERNAL_ERR0R.data);
  }
};