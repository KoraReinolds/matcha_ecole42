export default {
  requests: [
    // {
    //   path: "/profile-get",
    //   desc: "User_1: Запрос пользователя по токену",
    //   request: {
    //     activationCode: 'valid token'
    //   },
    //   expect: {
    //     type: 'ok',
    //     message: '',
    //     data: {
    //       tags: [],
    //       preference: [],
    //       likeList: [],
    //       email: 'reinoldskora@gmail.com',
    //       fname: 'maslyn',
    //       lname: 'skiles',
    //       login: 'User_1',
    //       isFilled: false,
    //       age: null,
    //       rating: 0,
    //       gender: '',
    //       biography: '',
    //       images: [],
    //       avatar: -1,
    //     }
    //   },
    // },
    
    // {
    //   path: "/profile-get",
    //   desc: "User_1: Запрос пользователя User_1 информации о самом себе)",
    //   request: {
    //     activationCode: 'valid token',
    //     login: 'User_1'
    //   },
    //   expect: { type: 'error', message: 'Произошла ошибка. Обратитесь к администратору' }
    // },
    // {
    //   path: "/profile-get",
    //   desc: "User_1: Запрос пользователя User_1 информации о User_2 (информация не заполнена, informationFilled == false)",
    //   request: {
    //     activationCode: 'valid token',
    //     login: 'User_2'
    //   },
    //   expect: { type: 'error', message: 'Произошла ошибка. Обратитесь к администратору' }
    // },
    {
      path: "/profile-get",
      desc: "User_2: Запрос пользователя по токену",
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
          login: 'User_2',
          isFilled: false,
          age: null,
          rating: 0,
          gender: '',
          biography: '',
          images: [],
          avatar: -1,
        }
      },
    },
    {
      path: "/profile-get",
      desc: "User_3: Запрос пользователя по токену",
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
          login: 'User_3',
          isFilled: false,
          age: null,
          rating: 0,
          gender: '',
          biography: '',
          images: [],
          avatar: -1,
        }
      },
    },
    {
      path: "/profile-get",
      desc: "User_4: Запрос пользователя по токену",
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
          login: 'User_4',
          isFilled: false,
          age: null,
          rating: 0,
          gender: '',
          biography: '',
          images: [],
          avatar: -1,
        }
      },
    },
    {
      path: "/profile-get",
      desc: "User_5: Запрос пользователя по токену",
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
          login: 'User_5',
          isFilled: false,
          age: null,
          rating: 0,
          gender: '',
          biography: '',
          images: [],
          avatar: -1,
        }
      }
    },
    {
      path: "/profile-get",
      desc: "User_6: Запрос пользователя по токену",
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
          login: 'User_6',
          isFilled: false,
          age: null,
          rating: 0,
          gender: '',
          biography: '',
          images: [],
          avatar: -1,
        }
      }
    },
    {
      path: "/profile-get",
      desc: "User_7: Запрос пользователя по токену",
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
          login: 'User_7',
          isFilled: false,
          age: null,
          rating: 0,
          gender: '',
          biography: '',
          images: [],
          avatar: -1,
        }
      }
    },
    {
      path: "/profile-get",
      desc: "User_1: Невалидный токен",
      request: {
        activationCode: 'invalid token'
      },
      // expect: 'код ответа 401'
    },
  ],  
}
