export default {
  requests: [
    {
      path: "/register",
      desc: "Регистрация User_1",
      request: {
        email: "reinoldskora@gmail.com",
        fname: "maslyn",
        lname: "skiles",
        login: "User_1",
        password: "123",
      },
      expect: { type: 'ok', message: "User_1" },
    },
    {
      path: "/register",
      desc: "Регистрация User_2",
      request: {
        email: "reinoldskora@gmail.com",
        fname: "maslyn",
        lname: "skiles",
        login: "User_2",
        password: "123",
      },
      expect: { type: 'ok', message: "User_2" },
    },
    {
      path: "/register",
      desc: "Регистрация User_3",
      request: {
        email: "reinoldskora@gmail.com",
        fname: "maslyn",
        lname: "skiles",
        login: "User_3",
        password: "123",
      },
      expect: { type: 'ok', message: "User_3" },
    },
    {
      path: "/register",
      desc: "Регистрация User_4",
      request: {
        email: "reinoldskora@gmail.com",
        fname: "maslyn",
        lname: "skiles",
        login: "User_4",
        password: "123",
      },
      expect: { type: 'ok', message: "User_4" },
    },
    {
      path: "/register",
      desc: "Регистрация User_5",
      request: {
        email: "reinoldskora@gmail.com",
        fname: "maslyn",
        lname: "skiles",
        login: "User_5",
        password: "123",
      },
      expect: { type: 'ok', message: "User_5" },
    },
    {
      path: "/register",
      desc: "Повторная регистрация User_1",
      request: {
        email: "reinoldskora@gmail.com",
        fname: "maslyn",
        lname: "skiles",
        login: "User_1",
        password: "123",
      },
      expect: { type: "error", message: "Пользователь с таким логином уже существует" }
    },
  ],  
}
