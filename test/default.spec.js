import { mount } from '@vue/test-utils'
import axios from 'axios'

const baseUrl = "http://localhost:4000";
const randomName = Math.random().toString().slice(0, 5);
const randomName2 = Math.random().toString().slice(0, 5);
const pass = "12345";
const loc = { y: 37.5420654, x: 55.808093 };
let token;

const register = {
  request: {
    email: "reinoldskora@gmail.com",
    fname: "maslyn",
    lname: "skiles",
    login: randomName,
    password: pass,
  },
  expect: { type: 'ok', message: randomName }
};

const registerWrong = {
  request: {
    email: "reinoldskora@gmail.com",
    fname: "maslyn",
    lname: "skiles",
    login: randomName,
    password: pass,
  },
  expect: { type: 'error', message: "Пользователь с таким логином уже существует" }
};

const loginRequest = {
  request: {
    login: randomName,
    password: pass,
    location: loc,
  },
  expect: { type: 'ok' }
}

const loginWrongRequest = {
  request: {
    login: randomName2,
    password: pass,
    location: loc,
  },
  expect: { type: 'error', message: 'Неверное имя пользователя или пароль' }
}

const loginWrongRequest2 = {
  request: {
    login: randomName,
    password: "pass",
    location: loc,
  },
  expect: { type: 'error', message: 'Неверное имя пользователя или пароль' }
}

const profileGet = {
  request: {
    // activationCode: token
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
      login: randomName,
      filledInformation: false,
      age: null,
      fameRaiting: 0,
      gender: '',
      biography: '',
      images: [],
      avatar: -1,
      curLocation: loc
    }
  },
  expectAfterUpdate: {
    type: 'ok',
    message: '',
    data: {
      tags: [ 'poker' ],
      preference: [ 'male', 'bisexual' ],
      likeList: [],
      email: 'reinoldskora@gmail.com',
      fname: 'maslyn',
      lname: 'skiles',
      login: randomName,
      filledInformation: true,
      age: 22,
      fameRaiting: 0,
      gender: 'male',
      biography: '123',
      images: [{src: "https://i.ibb.co/sgwqj1R/f824d53e3ffa.png", index: 0}],
      avatar: 0,
      curLocation: { y: 37.5420654, x: 55.808093 },
      location: { x: 55.807367943676674, y: 37.53614308249511 }
    }
  }
}

const profileGetWrong = {
  request: {
    activationCode: "token"
  },
  expect: { type: 'error', message: 'Произошла ошибка. Обратитесь к администратору' }
}

const profileUpdate = {
  request: {
    // activationCode: token,
    age: "22",
    avatar: 0,
    biography: "123",
    firstName: "maslyn",
    gender: "male",
    images: [{src: "https://i.ibb.co/sgwqj1R/f824d53e3ffa.png", index: 0}],
    lastName: "skiles",
    location: {x: 55.807367943676674, y: 37.53614308249511},
    mail: "reinoldskora@gmail.com",
    password: "12345",
    preference: ["male", "bisexual"],
    tags: ["poker"],
  },
  expect: { type: "ok", message: "Данные успешно обновленны" }
}


describe('API', () => {

  test('/register (Корректный запрос)', async () => {
    const { data } = await axios.post(baseUrl + "/register", register.request);
    expect(data).toEqual(register.expect);
  })

  test('/register (Имя пользователя занято)', async () => {
    const { data } = await axios.post(baseUrl + "/register", registerWrong.request);
    expect(data).toEqual(registerWrong.expect);
  })
  
  test('/login (Валидные данные для входа)', async () => {
    const { data } = await axios.post(baseUrl + "/login", loginRequest.request);
    expect(data.token === undefined).toBe(false);
    token = data["token"];
    delete data["token"];
    expect(data).toEqual(loginRequest.expect);
  })
  
  test('/login (Несуществующее имя', async () => {
    const { data } = await axios.post(baseUrl + "/login", loginWrongRequest.request);
    expect(data).toEqual(loginWrongRequest.expect);
  })
  
  test('/login (Неправильный пароль)', async () => {
    const { data } = await axios.post(baseUrl + "/login", loginWrongRequest2.request);
    expect(data).toEqual(loginWrongRequest2.expect);
  })

  test('/profile-get (Без параметров для получения текущего юзера)', async () => {
    const { data } = await axios.post(baseUrl + "/profile-get", { activationCode: token });
    expect(data).toEqual(profileGet.expect);
  })

  test('/profile-get (Неправильный токен)', async () => {
    const { data } = await axios.post(baseUrl + "/profile-get", profileGetWrong.request);
    expect(data).toEqual(profileGetWrong.expect);
  })

  test('/profile-update (Обновление профиля + получение обновленного профиля)', async () => {
    const { data } = await axios.post(baseUrl + "/profile-update", { activationCode: token, ...profileUpdate.request });
    expect(data).toEqual(profileUpdate.expect);
    const { data: newData } = await axios.post(baseUrl + "/profile-get", { activationCode: token });
    expect(newData).toEqual(profileGet.expectAfterUpdate);
  })

})
