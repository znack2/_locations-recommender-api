module.exports = {
  AUTHORIZATION_CODE_REQUIRED: {
    statusCode: 400,
    data: {
      code: '40001',
      title: 'Authorization code required'
    }
  },
  INVALID_AUTHORIZATION_CODE: {
    statusCode: 400,
    data: {
      code: '40002',
      title: 'Invalid authorization code'
    }
  },
  INVALID_PREFERENCE: {
    statusCode: 400,
    data: {
      code: '40003',
      title: 'Invalid preference'
    }
  },
  PREFERENCE_ALREADY_EXISTS: {
    statusCode: 400,
    data: {
      code: '40004',
      title: 'Preference already exists'
    }
  },
  PREFERENCE_DOESNT_EXIST: {
    statusCode: 400,
    data: {
      code: '40005',
      title: 'Preference doesn\'t exist'
    }
  },
  RECOMMENDATION_ID_REQUIRED: {
    statusCode: 400,
    data: {
      code: '40006',
      title: 'Recommendation id required'
    }
  },
  AUTHORIZATION_REQUIRED: {
    statusCode: 401,
    data: {
      code: '40101',
      title: 'Authorization required'
    }
  },
  INTERNAL_ERR0R: {
    statusCode: 500,
    data: {
      code: '50001',
      title: 'Internal error'
    }
  },
  NOT_IMPLEMENTED: {
    statusCode: 501,
    data: {
      code: '50101',
      title: 'Not implemented'
    }
  }
};