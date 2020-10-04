import users from '../users'

export default {
  requests: [
    {
      path: "/like-user",
      desc: "User_2: User_2 поставил лайк User_3",
      request: {
        action: "like",
        activationCode: "valid token",
        likeList: ["User_3"],
        login: "User_3",
        target: "User_3",
      },
      expect: {
        type: 'ok',
        message: 'Данные успешно обновленны',
      },
    },
    {
      path: "/history",
      desc: "User_2: Смотрит историю",
      request: {
        activationCode: "valid token",
      },
      expect: {
        type: 'ok',
        message: '',
        data: [
          {
            action: 'like',
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
        ]
      }
    },

    {
      path: "/like-user",
      desc: "User_2: User_2 поставил дизлайк User_3",
      request: {
        action: "dislike",
        activationCode: "valid token",
        likeList: ["User_3"],
        login: "User_3",
        target: "User_3",
      },
      expect: {
        type: 'ok',
        message: 'Данные успешно обновленны',
      },
    },
    {
      path: "/history",
      desc: "User_2: Смотрит историю",
      request: {
        activationCode: "valid token",
      },
      expect: {
        type: 'ok',
        message: '',
        data: [
          {
            action: 'like',
            target: users.User_3,
            // created: ...
          },
          {
            action: 'dislike',
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
        ]
      }
    },

    {
      path: "/like-user",
      desc: "User_2: User_2 поставил лайк User_3 (невалидный токен)",
      request: {
        action: "like",
        activationCode: "invalid token",
        likeList: ["User_3"],
        login: "User_3",
        target: "User_3",
      },
      // expect: 'код ответа 401'
    },
    {
      path: "/history",
      desc: "User_1: Невалидный токен",
      request: {
        activationCode: 'invalid token'
      },
      // expect: 'код ответа 401'
    },
    {
      path: "/notifications",
      desc: "User_1: Невалидный токен",
      request: {
        activationCode: 'invalid token'
      },
      // expect: 'код ответа 401'
    },
  ],  
}
