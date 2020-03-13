module.exports = {
  AUTHORIZATION_CODE_REQUIRED: {
    statusCode: 400,
    data: {
      code: '40001',
      title: 'Authorization code required'
    }
  },
  WRONG_AUTHORIZATION_CODE: {
    statusCode: 400,
    data: {
      code: '40002',
      title: 'Invalid authorization code'
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