
let User_1 = {
  tags: [ 'poker' ],
  preference: [ 'male', 'bisexual' ],
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
  curLocation: { y: 37.5420654, x: 55.808093 },
  location: { y: 37.5420654, x: 55.808093 },
};
let User_2 = {
  tags: [ 'poker', 'food' ],
  preference: [ 'male', 'bisexual' ],
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
  curLocation: { y: 37.5420654, x: 55.808093 },
  location: { y: 37.5420654, x: 55.808093 },
};
let User_3 = {
  tags: [ 'poker', 'food', 'sex' ],
  preference: [ 'male', 'bisexual' ],
  fname: 'User_3',
  lname: 'skiles',
  login: 'User_3',
  filledInformation: true,
  age: 22,
  fameRaiting: 0,
  gender: 'bisexual',
  biography: '123',
  images: [{src: "https://i.ibb.co/sgwqj1R/f824d53e3ffa.png", index: 0}],
  avatar: 0,
  curLocation: { y: 37.5420654, x: 55.808093 },
  location: { y: 37.5420654, x: 55.808093 },
};
let User_5 = {
  tags: [ 'poker', 'food' ],
  preference: [ 'male', 'bisexual' ],
  fname: 'User_5',
  lname: 'skiles',
  login: 'User_5',
  filledInformation: true,
  age: 22,
  fameRaiting: 0,
  gender: 'bisexual',
  biography: '123',
  images: [{src: "https://i.ibb.co/sgwqj1R/f824d53e3ffa.png", index: 0}],
  avatar: 0,
  curLocation: { y: 37.5999959, x: 55.808099 },
  location: { y: 37.5420654, x: 55.808093 },
}
let User_6 = {
  tags: [ 'poker', 'food' ],
  preference: [ 'male', 'bisexual' ],
  fname: 'User_6',
  lname: 'skiles',
  login: 'User_6',
  filledInformation: true,
  age: 22,
  fameRaiting: 0,
  gender: 'bisexual',
  biography: '123',
  images: [{src: "https://i.ibb.co/sgwqj1R/f824d53e3ffa.png", index: 0}],
  avatar: 0,
  curLocation: { y: 37.5999959, x: 55.808099 },
  location: { y: 37.5420654, x: 55.808093 },
}
let User_7 = {
  tags: [ 'poker', 'food' ],
  preference: [ 'male' ],
  fname: 'User_7',
  lname: 'skiles',
  login: 'User_7',
  filledInformation: true,
  age: 23,
  fameRaiting: 0,
  gender: 'bisexual',
  biography: '123',
  images: [{src: "https://i.ibb.co/sgwqj1R/f824d53e3ffa.png", index: 0}],
  avatar: 0,
  curLocation: { y: 37.5420654, x: 55.808093 },
  location: { y: 37.5420654, x: 55.808093 },
}

export default {
  requests: [
    {
      path: "/get-users",
      desc: "User_1: Получение списка из 3х пользователей для User_1",
      request: {
        activationCode: 'valid token',
        limit: 3,
        maxAge: 27,
        maxDist: 10,
        maxRate: 500,
        minAge: 18,
        minDist: "0",
        minRate: "0",
        preference: User_1.preference,
        skip: 0,
        sortOrder: {},
        tags: User_1.tags,
      },
      expect: {
        type: "ok",
        message: "",
        data: {
            users: [User_2, User_3, User_5],
            length: 5
        }
      }
    },
    {
      path: "/get-users",
      desc: "User_1: Получение списка из 3х пользователей для User_1, от 23 лет",
      request: {
        activationCode: 'valid token',
        limit: 3,
        maxAge: 27,
        maxDist: 10,
        maxRate: 500,
        minAge: 23,
        minDist: "0",
        minRate: "0",
        preference: User_1.preference,
        skip: 0,
        sortOrder: {},
        tags: User_1.tags,
      },
      expect: {
        type: "ok",
        message: "",
        data: {
            users: [User_7],
            length: 1
        }
      }
    },
    {
      path: "/get-users",
      desc: "User_1: Получение списка из 3х пользователей для User_1, до 22 лет",
      request: {
        activationCode: 'valid token',
        limit: 3,
        maxAge: 22,
        maxDist: 10,
        maxRate: 500,
        minAge: 18,
        minDist: "0",
        minRate: "0",
        preference: User_1.preference,
        skip: 0,
        sortOrder: {},
        tags: User_1.tags,
      },
      expect: {
        type: "ok",
        message: "",
        data: {
            users: [User_2, User_3, User_5],
            length: 4
        }
      }
    },
    {
      path: "/get-users",
      desc: "User_1: Получение списка из 3х пользователей для User_1, до 19 лет",
      request: {
        activationCode: 'valid token',
        limit: 3,
        maxAge: 19,
        maxDist: 10,
        maxRate: 500,
        minAge: 18,
        minDist: "0",
        minRate: "0",
        preference: User_1.preference,
        skip: 0,
        sortOrder: {},
        tags: User_1.tags,
      },
      expect: {
        type: "ok",
        message: "",
        data: {
            users: [],
            length: 0
        }
      }
    },
    {
      path: "/get-users",
      desc: "User_1: Получение списка из 3х пользователей для User_1, до 2 км",
      request: {
        activationCode: 'valid token',
        limit: 3,
        maxAge: 25,
        maxDist: 2,
        maxRate: 500,
        minAge: 18,
        minDist: "0",
        minRate: "0",
        preference: User_1.preference,
        skip: 0,
        sortOrder: {},
        tags: User_1.tags,
      },
      expect: {
        type: "ok",
        message: "",
        data: {
            users: [User_2, User_3, User_7],
            length: 3
        }
      }
    },
    {
      path: "/get-users",
      desc: "User_1: Получение списка из 3х пользователей для User_1, от 100 рейтинга",
      request: {
        activationCode: 'valid token',
        limit: 3,
        maxAge: 25,
        maxDist: 10,
        maxRate: 500,
        minAge: 18,
        minDist: "0",
        minRate: "100",
        preference: User_1.preference,
        skip: 0,
        sortOrder: {},
        tags: User_1.tags,
      },
      expect: {
        type: "ok",
        message: "",
        data: {
            users: [],
            length: 0
        }
      }
    },
    {
      path: "/get-users",
      desc: "User_1: Получение списка из 3х пользователей для User_1, с тэгом 'sex'",
      request: {
        activationCode: 'valid token',
        limit: 3,
        maxAge: 25,
        maxDist: 10,
        maxRate: 500,
        minAge: 18,
        minDist: "0",
        minRate: "0",
        preference: User_1.preference,
        skip: 0,
        sortOrder: {},
        tags: ['sex'],
      },
      expect: {
        type: "ok",
        message: "",
        data: {
            users: [User_3],
            length: 1
        }
      }
    },
    {
      path: "/get-users",
      desc: "User_1: Получение списка из 3х пользователей для User_1, с тэгом 'code'",
      request: {
        activationCode: 'valid token',
        limit: 3,
        maxAge: 25,
        maxDist: 10,
        maxRate: 500,
        minAge: 18,
        minDist: "0",
        minRate: "0",
        preference: User_1.preference,
        skip: 0,
        sortOrder: {},
        tags: ['code'],
      },
      expect: {
        type: "ok",
        message: "",
        data: {
            users: [],
            length: 0
        }
      }
    },
    {
      path: "/get-users",
      desc: "User_2: Получение списка из 3х пользователей для User_2",
      request: {
        activationCode: 'valid token',
        limit: 3,
        maxAge: 27,
        maxDist: 10,
        maxRate: 500,
        minAge: 18,
        minDist: "0",
        minRate: "0",
        preference: User_1.preference,
        skip: 0,
        sortOrder: {},
        tags: User_1.tags,
      },
      expect: {
        type: "ok",
        message: "",
        data: {
            users: [User_1, User_3, User_5],
            length: 5
        }
      }
    },
    {
      path: "/get-users",
      desc: "User_3: Получение списка из 3х пользователей для User_3",
      request: {
        activationCode: 'valid token',
        limit: 3,
        maxAge: 27,
        maxDist: 10,
        maxRate: 500,
        minAge: 18,
        minDist: "0",
        minRate: "0",
        preference: User_3.preference,
        skip: 0,
        sortOrder: {},
        tags: User_3.tags,
      },
      expect: {
        type: "ok",
        message: "",
        data: {
            users: [User_1, User_2, User_5],
            length: 5
        }
      }
    },
    {
      path: "/get-users",
      desc: "User_5: Получение списка из одного пользователя для User_5, страница 1 (skip = 0)",
      request: {
        activationCode: 'valid token',
        limit: 1,
        maxAge: 27,
        maxDist: 10,
        maxRate: 500,
        minAge: 18,
        minDist: "0",
        minRate: "0",
        preference: User_5.preference,
        skip: 0,
        sortOrder: {},
        tags: User_5.tags,
      },
      expect: {
        type: "ok",
        message: "",
        data: {
            users: [User_1],
            length: 5
        }
      }
    },
    {
      path: "/get-users",
      desc: "User_5: Получение списка из одного пользователя для User_5, страница 4 (skip = 3)",
      request: {
        activationCode: 'valid token',
        limit: 1,
        maxAge: 27,
        maxDist: 10,
        maxRate: 500,
        minAge: 18,
        minDist: "0",
        minRate: "0",
        preference: User_5.preference,
        skip: 3,
        sortOrder: {},
        tags: User_5.tags,
      },
      expect: {
        type: "ok",
        message: "",
        data: {
            users: [User_6],
            length: 5
        }
      }
    },
    {
      path: "/get-users",
      desc: "User_6: Получение списка из 3x пользователей для User_6, страница 2 (skip = 3)",
      request: {
        activationCode: 'valid token',
        limit: 3,
        maxAge: 27,
        maxDist: 10,
        maxRate: 500,
        minAge: 18,
        minDist: "0",
        minRate: "0",
        preference: User_6.preference,
        skip: 3,
        sortOrder: {},
        tags: User_6.tags,
      },
      expect: {
        type: "ok",
        message: "",
        data: {
            users: [User_5, User_7],
            length: 5
        }
      }
    },
    {
      path: "/get-users",
      desc: "User_7: Получение списка из 3x пользователей для User_7, страница 1 (skip = 0)",
      request: {
        activationCode: 'valid token',
        limit: 3,
        maxAge: 27,
        maxDist: 10,
        maxRate: 500,
        minAge: 18,
        minDist: "0",
        minRate: "0",
        preference: User_7.preference,
        skip: 0,
        sortOrder: {},
        tags: User_7.tags,
      },
      expect: {
        type: "ok",
        message: "",
        data: {
            users: [User_1],
            length: 1
        }
      }
    },
    {
      path: "/get-users",
      desc: "User_1: Убывающая сортировка по возрасту",
      request: {
        activationCode: 'valid token',
        limit: 3,
        maxAge: 27,
        maxDist: 10,
        maxRate: 500,
        minAge: 18,
        minDist: "0",
        minRate: "0",
        preference: User_1.preference,
        skip: 0,
        sortOrder: {age: -1},
        tags: User_1.tags,
      },
      expect: {
        type: "ok",
        message: "",
        data: {
            users: [User_7, User_2, User_3],
            length: 5
        }
      }
    },
    {
      path: "/get-users",
      desc: "User_1: Возрастающая сортировка по возрасту",
      request: {
        activationCode: 'valid token',
        limit: 3,
        maxAge: 27,
        maxDist: 10,
        maxRate: 500,
        minAge: 18,
        minDist: "0",
        minRate: "0",
        preference: User_1.preference,
        skip: 0,
        sortOrder: {age: 1},
        tags: User_1.tags,
      },
      expect: {
        type: "ok",
        message: "",
        data: {
            users: [User_2, User_3, User_5],
            length: 5
        }
      }
    },
    {
      path: "/get-users",
      desc: "User_2: Возрастающая сортировка по возрасту, возрастающая по количеству общих тэгов",
      request: {
        activationCode: 'valid token',
        limit: 3,
        maxAge: 27,
        maxDist: 10,
        maxRate: 500,
        minAge: 18,
        minDist: "0",
        minRate: "0",
        preference: User_2.preference,
        skip: 0,
        sortOrder: {age: 1, countTags: 1},
        tags: User_2.tags,
      },
      expect: {
        type: "ok",
        message: "",
        data: {
            users: [User_1, User_3, User_5],
            length: 5
        }
      }
    },
    {
      path: "/get-users",
      desc: "User_2: Возрастающая сортировка по возрасту, убывающая по количеству общих тэгов",
      request: {
        activationCode: 'valid token',
        limit: 3,
        maxAge: 27,
        maxDist: 10,
        maxRate: 500,
        minAge: 18,
        minDist: "0",
        minRate: "0",
        preference: User_2.preference,
        skip: 0,
        sortOrder: {age: 1, countTags: -1},
        tags: User_2.tags,
      },
      expect: {
        type: "ok",
        message: "",
        data: {
            users: [User_3, User_5, User_6],
            length: 5
        }
      }
    },
    {
      path: "/get-users",
      desc: "User_2: Возрастающая сортировка по возрасту, убывающая по количеству общих тэгов, возврастающая по расстоянию",
      request: {
        activationCode: 'valid token',
        limit: 3,
        maxAge: 27,
        maxDist: 10,
        maxRate: 500,
        minAge: 18,
        minDist: "0",
        minRate: "0",
        preference: User_2.preference,
        skip: 0,
        sortOrder: {age: 1, countTags: -1, dist: 1},
        tags: User_2.tags,
      },
      expect: {
        type: "ok",
        message: "",
        data: {
            users: [User_3, User_5, User_6],
            length: 5
        }
      }
    },
    {
      path: "/get-users",
      desc: "User_2: Возрастающая сортировка по возрасту, убывающая по количеству общих тэгов, убывающая по расстоянию",
      request: {
        activationCode: 'valid token',
        limit: 3,
        maxAge: 27,
        maxDist: 10,
        maxRate: 500,
        minAge: 18,
        minDist: "0",
        minRate: "0",
        preference: User_2.preference,
        skip: 0,
        sortOrder: {age: 1, countTags: -1, dist: -1},
        tags: User_2.tags,
      },
      expect: {
        type: "ok",
        message: "",
        data: {
            users: [User_5, User_6, User_3],
            length: 5
        }
      }
    },
    {
      path: "/get-users",
      desc: "User_1: Невалидный токен",
      request: {
        activationCode: 'invalid token'
      },
      // expect: 'код ответа 401'
    },
  ],  
}
