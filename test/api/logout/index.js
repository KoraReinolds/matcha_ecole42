export default {
  requests: [
    {
      path: "/logout",
      desc: "User_1: Логаут",
      request: {
        activationCode: 'valid token'
      },
      expect: { type: 'ok', message: '' }
    },
    {
      path: "/logout",
      desc: "User_2: Логаут",
      request: {
        activationCode: 'valid token'
      },
      expect: { type: 'ok', message: '' }
    },
    {
      path: "/logout",
      desc: "User_3: Логаут",
      request: {
        activationCode: 'valid token'
      },
      expect: { type: 'ok', message: '' }
    },
    {
      path: "/logout",
      desc: "User_4: Логаут",
      request: {
        activationCode: 'valid token'
      },
      expect: { type: 'ok', message: '' }
    },
    {
      path: "/logout",
      desc: "User_5: Логаут",
      request: {
        activationCode: 'valid token'
      },
      expect: { type: 'ok', message: '' }
    },
    {
      path: "/logout",
      desc: "User_1: Невалидный токен",
      request: {
        activationCode: 'invalid token'
      },
      expect: { type: 'error', message: 'Произошла ошибка. Обратитесь к администратору' }
    },
  ],  
}
