const errorsByCodes = require('./errorsByCodes');

class ApiError {
  constructor(errorCode) {
    Error.call(this);
    Error.captureStackTrace(this);

    Object.assign(this, errorsByCodes[errorCode]);
  }
}

module.exports = ApiError;