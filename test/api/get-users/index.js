export default {
  correct: {
    path: '/get-users',
    desc: 'Корректный запрос',
    request: {
      activationCode: 'valid token'
    },
    expect: {
      type: 'ok',
      message: '',
      data: {
        tags: [],
        preference: [],
        likeList: [],
        email: 'reinoldskora@gmail.com',
        fname: 'maslyn',
        lname: 'skiles',
        login: 'User_1',
        filledInformation: false,
        age: null,
        fameRaiting: 0,
        gender: '',
        biography: '',
        images: [],
        avatar: -1,
        curLocation: { y: 37.5420654, x: 55.808093 }
      }
    },
  },

  wrong: {
    path: '/get-users',
    desc: 'Невалидный токен',
    request: {
      activationCode: 'invalid token'
    },
    expect: { type: 'error', message: 'Произошла ошибка. Обратитесь к администратору' }
  },
}
