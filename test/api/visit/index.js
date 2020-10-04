import users from '../users'

export default {
  requests: [
    {
      path: "/profile-get",
      desc: "User_1: Посетил страницу User_2",
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
          likeList: ['User_3'],
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
          curLocation: { y: 37.5420654, x: 55.808093 },
          location: { y: 37.5420654, x: 55.808093 },
        }
      },
    },
    {
      path: "/history",
      desc: "User_1: Смотрит историю",
      request: {
        activationCode: "valid token",
      },
      expect: {
        type: 'ok',
        message: '',
        data: [
          {
            action: 'visit',
            target: users.User_2,
            // created: ...
          },
        ]
      }
    },
    {
      path: "/notifications",
      desc: "User_2: Смотрит уведомления",
      request: {
        activationCode: "valid token",
      },
      expect: {
        type: 'ok',
        message: '',
        data: [
          {
            action: 'visit',
            who: users.User_1,
            // created: ...
          },
        ]
      }
    },

    {
      path: "/profile-get",
      desc: "User_1: Посетил страницу User_3",
      request: {
        activationCode: 'valid token',
        login: 'User_3'
      },
      expect: {
        type: 'ok',
        message: '',
        data: {
          tags: [ 'poker', 'food', 'sex' ],
          preference: [ 'male', 'bisexual' ],
          likeList: [],
          email: 'reinoldskora@gmail.com',
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
        }
      },
    },
    {
      path: "/history",
      desc: "User_1: Смотрит историю",
      request: {
        activationCode: "valid token",
      },
      expect: {
        type: 'ok',
        message: '',
        data: [
          {
            action: 'visit',
            target: users.User_2,
            // created: ...
          },
          {
            action: 'visit',
            target: users.User_3,
            // created: ...
          },
        ]
      }
    },
    {
      path: "/notifications",
      desc: "User_3: Смотрит уведомления",
      request: {
        activationCode: "valid token",
      },
      expect: {
        type: 'ok',
        message: '',
        data: [
          {
            action: 'like',
            who: users.User_2,
            // created: ...
          },
          {
            action: 'dislike',
            who: users.User_2,
            // created: ...
          },
          {
            action: 'visit',
            who: users.User_1,
            // created: ...
          },
        ]
      }
    },
  ],  
}
