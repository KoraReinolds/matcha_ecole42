export default {
  correct: {
    path: "/register",
    desc: "Корректный запрос",
    request: {
      email: "reinoldskora@gmail.com",
      fname: "maslyn",
      lname: "skiles",
      login: "User_1",
      password: "123",
    },
    expect: { type: 'ok', message: "User_1" }
  },
  
  wrong: {
    path: "/register",
    desc: "Имя пользователя занято",
    request: {
      email: "reinoldskora@gmail.com",
      fname: "maslyn",
      lname: "skiles",
      login: "User_1",
      password: "123",
    },
    expect: { type: "error", message: "Пользователь с таким логином уже существует" }
  }
}
