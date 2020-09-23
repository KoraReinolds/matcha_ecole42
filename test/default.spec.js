import { mount } from '@vue/test-utils'
import axios from 'axios'
import register from './api/register'
import login from './api/login'
import logout from './api/logout'


// const baseUrl = "http://localhost:4000";
const baseUrl = "https://mskiles-matcha-back.herokuapp.com";
let token;

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

  test('/register ()', async () => {
    const { data } = await axios.post(baseUrl + "/register", register.correct.request);
    expect(data).toEqual(register.correct.expect);
  })

  test('/register ()', async () => {
    const { data } = await axios.post(baseUrl + "/register", register.wrong.request);
    expect(data).toEqual(register.wrong.expect);
  })
  
  test('/login ()', async () => {
    const { data } = await axios.post(baseUrl + "/login", login.correct.request);
    expect(data.token === undefined).toBe(false);
    token = data["token"];
    delete data["token"];
    expect(data).toEqual(login.correct.expect);
  })
  
  test('/login (я', async () => {
    const { data } = await axios.post(baseUrl + "/login", login.wrong.request);
    expect(data).toEqual(login.wrong.expect);
  })
  
  test('/login ()', async () => {
    const { data } = await axios.post(baseUrl + "/login", login.wrong2.request);
    expect(data).toEqual(login.wrong2.expect);
  })

  // test('/logout (Корректный запрос)', async () => {
  //   const { data } = await axios.post(baseUrl + "/logout", { activationCode: token });
  //   expect(data).toEqual(logoutRequest.expect);
  // })

  // test('/logout (Неправильный токен)', async () => {
  //   const { data } = await axios.post(baseUrl + "/logout", logoutRequestWrong.request);
  //   expect(data).toEqual(logoutRequestWrong.expect);
  // })

  // test('/profile-get (Без параметров для получения текущего юзера)', async () => {
  //   const { data } = await axios.post(baseUrl + "/profile-get", { activationCode: token });
  //   expect(data).toEqual(profileGet.expect);
  // })

  // test('/profile-get (Неправильный токен)', async () => {
  //   const { data } = await axios.post(baseUrl + "/profile-get", profileGetWrong.request);
  //   expect(data).toEqual(profileGetWrong.expect);
  // })

  // test('/profile-update (Обновление профиля + получение обновленного профиля)', async () => {
  //   const { data } = await axios.post(baseUrl + "/profile-update", { activationCode: token, ...profileUpdate.request });
  //   expect(data).toEqual(profileUpdate.expect);
  //   const { data: newData } = await axios.post(baseUrl + "/profile-get", { activationCode: token });
  //   expect(newData).toEqual(profileGet.expectAfterUpdate);
  // })

  // test('/profile-get (Неправильный токен)', async () => {
  //   const { data } = await axios.post(baseUrl + "/profile-get", profileGetWrong.request);
  //   expect(data).toEqual(profileGetWrong.expect);
  // })

})
