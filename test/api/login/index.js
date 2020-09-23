export default {
  correct: {
    path: '/login',
    desc: 'Валидные данные для входа',
    request: {
      login: 'User_1',
      password: '123',
      location: { y: 37.5420654, x: 55.808093 },
    },
    expect: { type: 'ok' }
  },

  wrong: {
    path: '/login',
    desc: 'Несуществующее имя',
    request: {
      login: 'fake_user',
      password: '123',
      location: { y: 37.5420654, x: 55.808093 },
    },
    expect: { type: 'error', message: 'Неверное имя пользователя или пароль' }
  },
  
  wrong2: {
    path: '/login',
    desc: 'Неправильный пароль',
    request: {
      login: 'User_1',
      password: "pass",
      location: { y: 37.5420654, x: 55.808093 },
    },
    expect: { type: 'error', message: 'Неверное имя пользователя или пароль' }
  }
}