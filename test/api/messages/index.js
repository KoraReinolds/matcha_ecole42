import users from '../users'

export default {
  requests: [
    {
      path: "/chat-list",
      desc: "User_5: олучить список пользователей, с которыми можно переписываться",
      request: {
        activationCode: 'valid token',
      },
      expect: {
        type: "ok",
        message: "",
        data: []
      },
    },

    {
      path: "/like-user",
      desc: "User_5: User_5 поставил лайк User_6",
      request: {
        action: "like",
        activationCode: "valid token",
        likeList: ["User_6"],
        login: "User_6",
        target: "User_6",
      },
      expect: {
        type: 'ok',
        message: 'Данные успешно обновленны',
      },
    },
    {
      path: "/like-user",
      desc: "User_6: User_6 поставил лайк User_5",
      request: {
        action: "like",
        activationCode: "valid token",
        likeList: ["User_5"],
        login: "User_5",
        target: "User_5",
      },
      expect: {
        type: 'ok',
        message: 'Данные успешно обновленны',
      },
    },

    {
      path: "/chat-list",
      desc: "User_5: олучить список пользователей, с которыми можно переписываться",
      request: {
        activationCode: 'valid token',
      },
      expect: {
        type: "ok",
        message: "",
        data: [{...users.User_6, likeList: ['User_5']}]
      },
    },

    {
      path: "/get-messages",
      desc: "User_5: User_5 получает переписку с User_6",
      request: {
        activationCode: "valid token",
        login: "User_6",
      },
      expect: {
        type: 'ok',
        message: '',
        data: [],
      },
    },
    {
      path: "/get-messages",
      desc: "User_6: User_6 получает переписку с User_5",
      request: {
        activationCode: "valid token",
        login: "User_5",
      },
      expect: {
        type: 'ok',
        message: '',
        data: [],
      },
    },

    {
      path: "/send-message",
      desc: "User_5: User_5 отправляет сообщение User_6",
      request: {
        activationCode: "valid token",
        message: "hi",
        target: "User_6",
      },
      expect: {
        type: "ok",
        message: "",
        data: {
          action: "messages",
          // created: ...
          message: "hi",
          who: {...users.User_5, likeList: ['User_6']},
        }
      },
    },
    {
      path: "/send-message",
      desc: "User_6: User_6 отправляет сообщение User_5",
      request: {
        activationCode: "valid token",
        message: "hello!",
        target: "User_5",
      },
      expect: {
        type: "ok",
        message: "",
        data: {
          action: "messages",
          // created: ...
          message: "hello!",
          who: {...users.User_6, likeList: ['User_5']},
        }
      },
    },
    {
      path: "/get-messages",
      desc: "User_6: User_6 получает переписку с User_5",
      request: {
        activationCode: "valid token",
        login: "User_5",
      },
      expect: {
        type: 'ok',
        message: '',
        data: [
          {
            action: "messages",
            // created: ...
            message: "hi",
            who: { login: 'User_5' },
            target: { login: 'User_6' },
          },
          {
            action: "messages",
            // created: ...
            message: "hello!",
            who: { login: 'User_6' },
            target: { login: 'User_5' },
          },
        ],
      },
    },

    {
      path: "/history",
      desc: "User_6: Смотрит историю",
      request: {
        activationCode: "valid token",
      },
      expect: {
        type: 'ok',
        message: '',
        data: [
          {
            action: 'like',
            target: users.User_5,
            // created: ...
          },
          {
            action: 'messages',
            target: users.User_5,
            // created: ...
          },
        ]
      }
    },
    {
      path: "/notifications",
      desc: "User_6: Смотрит уведомления",
      request: {
        activationCode: "valid token",
      },
      expect: {
        type: 'ok',
        message: '',
        data: [
          {
            action: 'like',
            who: users.User_5,
            // created: ...
          },
          {
            action: 'messages',
            who: users.User_5,
            // created: ...
          },
        ]
      }
    },

    {
      path: "/history",
      desc: "User_5: Смотрит историю",
      request: {
        activationCode: "valid token",
      },
      expect: {
        type: 'ok',
        message: '',
        data: [
          {
            action: 'like',
            target: users.User_6,
            // created: ...
          },
          {
            action: 'messages',
            target: users.User_6,
            // created: ...
          },
        ]
      }
    },
    {
      path: "/notifications",
      desc: "User_5: Смотрит уведомления",
      request: {
        activationCode: "valid token",
      },
      expect: {
        type: 'ok',
        message: '',
        data: [
          {
            action: 'like',
            who: users.User_6,
            // created: ...
          },
          {
            action: 'messages',
            who: users.User_6,
            // created: ...
          },
        ]
      }
    },

    {
      path: "/chat-list",
      desc: "User_5: олучить список пользователей, с которыми можно переписываться",
      request: {
        activationCode: 'invalid token',
      },
      // expect: 'код ответа 401'
    },
    {
      path: "/get-messages",
      desc: "User_6: User_6 получает переписку с User_5",
      request: {
        activationCode: "invalid token",
        login: "User_5",
      },
      // expect: 'код ответа 401'
    },

    {
      path: "/send-message",
      desc: "User_5: User_5 отправляет сообщение User_6",
      request: {
        activationCode: "invalid token",
        message: "hi",
        target: "User_6",
      },
      // expect: 'код ответа 401'
    },
  ],
}
