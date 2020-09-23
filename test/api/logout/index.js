export default {
  logoutRequest: {
    request: {
      activationCode: 'valid token'
    },
    expect: { type: 'ok', message: '' }
  },

  logoutRequestWrong: {
    request: {
      activationCode: 'invalid token'
    },
    expect: { type: 'ok', message: '' }
  }
}