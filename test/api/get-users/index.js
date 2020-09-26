
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
  age: 23,
  fameRaiting: 0,
  gender: 'bisexual',
  biography: '123',
  images: [{src: "https://i.ibb.co/sgwqj1R/f824d53e3ffa.png", index: 0}],
  avatar: 0,
  curLocation: { y: 37.5420654, x: 55.808093 },
  location: { y: 37.5420654, x: 55.808093 },
};
let User_3 = {
  tags: [ 'poker', 'food' ],
  preference: [ 'male', 'bisexual' ],
  fname: 'User_3',
  lname: 'skiles',
  login: 'User_3',
  filledInformation: true,
  age: 23,
  fameRaiting: 0,
  gender: 'bisexual',
  biography: '123',
  images: [{src: "https://i.ibb.co/sgwqj1R/f824d53e3ffa.png", index: 0}],
  avatar: 0,
  curLocation: { y: 37.5420654, x: 55.808093 },
  location: { y: 37.5420654, x: 55.808093 },
};
let User_4 = {
  tags: [ 'poker', 'food' ],
  preference: [ 'male', 'bisexual' ],
  fname: 'User_4',
  lname: 'skiles',
  login: 'User_4',
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
        preference: ["male", "bisexual", "female"],
        skip: 0,
        sortOrder: {countTags: -1, fameRaiting: -1, dist: 1},
        tags: ["poker"],
      },
      expect: {
        type: "ok",
        message: "",
        data: {
            users: [User_2, User_3, User_4],
            length: 3
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
        preference: ["male", "bisexual", "female"],
        skip: 0,
        sortOrder: {countTags: -1, fameRaiting: -1, dist: 1},
        tags: ["poker"],
      },
      expect: {
        type: "ok",
        message: "",
        data: {
            users: [User_1, User_3, User_4],
            length: 3
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
        preference: ["male", "bisexual", "female"],
        skip: 0,
        sortOrder: {countTags: -1, fameRaiting: -1, dist: 1},
        tags: ["poker"],
      },
      expect: {
        type: "ok",
        message: "",
        data: {
            users: [User_1, User_2, User_4],
            length: 3
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
