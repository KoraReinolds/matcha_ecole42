export default {
  requests: [

    {
      path: "/profile-update",
      desc: "User_1: Обновление информации пользователя User_1",
      request: {
        activationCode: 'valid token',
        age: 22,
        avatar: 0,
        biography: "123",
        fname: "User_1",
        gender: "male",
        images: [{src: "https://i.ibb.co/sgwqj1R/f824d53e3ffa.png", index: 0}],
        lname: "skiles",
        location: { y: 37.5420654, x: 55.808093 },
        mail: "reinoldskora@gmail.com",
        password: "12345",
        preference: ["male", "bisexual"],
        tags: ["poker"],
      },
      expect: {
        type: 'ok',
        message: 'Данные успешно обновленны',
      },
    },
    {
      path: "/profile-get",
      desc: "User_1: Получение обновленной информации о себе",
      request: {
        activationCode: 'valid token',
        login: 'User_1'
      },
      expect: {
        type: 'ok',
        message: '',
        data: {
          tags: [ 'poker' ],
          preference: [ 'male', 'bisexual' ],
          likeList: [],
          email: 'reinoldskora@gmail.com',
          fname: 'User_1',
          lname: 'skiles',
          login: 'User_1',
          filledInformation: true,
          age: 22,
          fameRaiting: 0,
          gender: 'male',
          biography: '123',
          images: [{src: "https://i.ibb.co/sgwqj1R/f824d53e3ffa.png", index: 0}],
          avatar: 0,
          location: { y: 37.5420654, x: 55.808093 },
        }
      },
    },

    {
      path: "/profile-update",
      desc: "User_2: Обновление информации пользователя User_2",
      request: {
        activationCode: 'valid token',
        age: 22,
        avatar: 0,
        biography: "123",
        fname: "User_2",
        gender: "bisexual",
        images: [{src: "https://i.ibb.co/sgwqj1R/f824d53e3ffa.png", index: 0}],
        lname: "skiles",
        location: { y: 37.5420654, x: 55.808093 },
        mail: "reinoldskora@gmail.com",
        password: "12345",
        preference: [ 'male', 'bisexual' ],
        tags: ["poker", "food"],
      },
      expect: {
        type: 'ok',
        message: 'Данные успешно обновленны',
      },
    },
    {
      path: "/profile-get",
      desc: "User_2: Получение обновленной информации о User_2",
      request: {
        activationCode: 'valid token',
        login: 'User_2'
      },
      expect: {
        type: 'ok',
        message: '',
        data: {
          tags: [ 'poker', 'food' ],
          preference: [ 'male', 'bisexual' ],
          likeList: [],
          email: 'reinoldskora@gmail.com',
          fname: 'User_2',
          lname: 'skiles',
          login: 'User_2',
          filledInformation: true,
          age: 22,
          fameRaiting: 0,
          gender: 'bisexual',
          biography: '123',
          images: [{src: "https://i.ibb.co/sgwqj1R/f824d53e3ffa.png", index: 0}],
          avatar: 0,
          location: { y: 37.5420654, x: 55.808093 },
        }
      },
    },

    {
      path: "/profile-update",
      desc: "User_3: Обновление информации пользователя User_3",
      request: {
        activationCode: 'valid token',
        age: 22,
        avatar: 0,
        biography: "123",
        fname: "User_3",
        gender: "bisexual",
        images: [{src: "https://i.ibb.co/sgwqj1R/f824d53e3ffa.png", index: 0}],
        lname: "skiles",
        location: { y: 37.5420654, x: 55.808093 },
        mail: "reinoldskora@gmail.com",
        password: "12345",
        preference: ["male", "bisexual"],
        tags: ["poker", "food", "sex"],
      },
      expect: {
        type: 'ok',
        message: 'Данные успешно обновленны',
      },
    },

    {
      path: "/profile-update",
      desc: "User_5: Обновление информации пользователя User_5",
      request: {
        activationCode: 'valid token',
        age: 22,
        avatar: 0,
        biography: "123",
        fname: "User_5",
        gender: "bisexual",
        images: [{src: "https://i.ibb.co/sgwqj1R/f824d53e3ffa.png", index: 0}],
        lname: "skiles",
        location: { y: 37.5420654, x: 55.808093 },
        mail: "reinoldskora@gmail.com",
        password: "12345",
        preference: ["male", "bisexual"],
        tags: ["poker", "food"],
      },
      expect: {
        type: 'ok',
        message: 'Данные успешно обновленны',
      },
    },

    {
      path: "/profile-update",
      desc: "User_6: Обновление информации пользователя User_6",
      request: {
        activationCode: 'valid token',
        age: 22,
        avatar: 0,
        biography: "123",
        fname: "User_6",
        gender: "bisexual",
        images: [{src: "https://i.ibb.co/sgwqj1R/f824d53e3ffa.png", index: 0}],
        lname: "skiles",
        location: { y: 37.5420654, x: 55.808093 },
        mail: "reinoldskora@gmail.com",
        password: "12345",
        preference: ["male", "bisexual"],
        tags: ["poker", "food"],
      },
      expect: {
        type: 'ok',
        message: 'Данные успешно обновленны',
      },
    },

    {
      path: "/profile-update",
      desc: "User_7: Обновление информации пользователя User_7",
      request: {
        activationCode: 'valid token',
        age: 23,
        avatar: 0,
        biography: "123",
        fname: "User_7",
        gender: "bisexual",
        images: [{src: "https://i.ibb.co/sgwqj1R/f824d53e3ffa.png", index: 0}],
        lname: "skiles",
        location: { y: 37.5420654, x: 55.808093 },
        mail: "reinoldskora@gmail.com",
        password: "12345",
        preference: ["male"],
        tags: ["poker", "food"],
      },
      expect: {
        type: 'ok',
        message: 'Данные успешно обновленны',
      },
    },

    {
      path: "/profile-update",
      desc: "User_1: Невалидный токен",
      request: {
        activationCode: 'invalid token'
      },
      // expect: 'код ответа 401'
    },
  ],  
}
