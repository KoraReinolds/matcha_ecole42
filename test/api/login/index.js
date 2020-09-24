export default {
  requests: [
    {
      path: "/login",
      desc: "Авторизация User_1",
      request: {
        login: 'User_1',
        password: '123',
        location: { y: 37.5420654, x: 55.808093 },
      },
      expect: { type: 'ok' }
    },
    {
      path: "/login",
      desc: "Авторизация User_2",
      request: {
        login: 'User_2',
        password: '123',
        location: { y: 37.5420654, x: 55.808093 },
      },
      expect: { type: 'ok' }
    },
    {
      path: "/login",
      desc: "Авторизация User_3",
      request: {
        login: 'User_3',
        password: '123',
        location: { y: 37.5420654, x: 55.808093 },
      },
      expect: { type: 'ok' }
    },
    {
      path: "/login",
      desc: "Авторизация User_4",
      request: {
        login: 'User_4',
        password: '123',
        location: { y: 37.5420654, x: 55.808093 },
      },
      expect: { type: 'ok' }
    },
    {
      path: "/login",
      desc: "Авторизация User_5",
      request: {
        login: 'User_5',
        password: '123',
        location: { y: 37.5420654, x: 55.808093 },
      },
      expect: { type: 'ok' }
    },
    {
      path: "/login",
      desc: "Авторизация c несуществующим именем",
      request: {
        login: 'fake_user',
        password: '123',
        location: { y: 37.5420654, x: 55.808093 },
      },
      expect: { type: 'error', message: 'Неверное имя пользователя или пароль' }
    },
    {
      path: "/login",
      desc: "Авторизация c неверным паролем",
      request: {
        login: 'User_1',
        password: '12345',
        location: { y: 37.5420654, x: 55.808093 },
      },
      expect: { type: 'error', message: 'Неверное имя пользователя или пароль' }
    },
  ],  
}
