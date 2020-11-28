// import { mount } from '@vue/test-utils'
import axios from 'axios'
// import register from './api/register'
// import login from './api/login'
// import logout from './api/logout'
// import profileGet from './api/profile-get'
// import profileUpdate from './api/profile-update'
// import getUsers from './api/get-users'
// import likeUser from './api/like-user'
// import visit from './api/visit'
// import messages from './api/messages'
const { generateUser } = require('../server/dataGeneration/index')

const baseUrl = "http://192.168.29.71:4567"
// const baseUrl = "https://mskiles-matcha-back.herokuapp.com"
const tokens = {}
const successResponce = { type: 'ok' }
const registerTemplate = {
  login: 'User_',
  password: '123',
  email: "reinoldskora@gmail.com",
  fname: "maslyn",
  lname: "skiles",
  location: { y: 37.5420654, x: 55.808093 },
}
const history = []

const store = {

  users: {},

  getOtherProfile(login) {

    const user = { ...this.users[login] }
    user.location = user.geoLoc || user.realLocation
    delete user.password
    delete user.geoLoc
    delete user.realLocation
    delete user.email
    user.likedFrom = false
    user.likedTo = false
    const resp = this.users[login] && this.users[login].isFilled ? {
      type: "ok",
      data: user,
    } : {
      type: "error",
      message: "User not found",
    }
    return resp
  },

  getMyProfile(login) {

    const user = { ...this.users[login] }
    user.location = user.geoLoc || user.realLocation
    delete user.password
    delete user.geoLoc
    delete user.realLocation
    return {
      type: "ok",
      data: user,
    }
  },

  getUserProfile(loginFrom, loginTo, desc) {

    const user = this.users[loginFrom]
    const targetUser = this.users[loginTo]
    let myProfile = loginFrom === loginTo
    const path = "profile-get" + `${myProfile ? '' : '/' + loginTo}`
    // console.log(`${baseUrl}/${path}`)
    test(`${path}, (${user.login}: ${desc || 'Получение информации о пользователе'}`, async () => {
      let data
      let error
      try {
        data = (await axios.get(`${baseUrl}/${path}`, {
          headers: { "Authorization": tokens[user.login] }
        })).data
      } catch({ response }) {
        error = response
      }

      if (data) {
        expect(data).toEqual(myProfile ? store.getMyProfile(loginFrom) : store.getOtherProfile(loginTo))
      } else if (error) {
        expect(error.status).toEqual(401)
      }
    })
  },

  loginUser(login) {

    const user = this.users[login]

    test(`login, (${user.login}: Авторизация пользователя ${user.login})`, async () => {
      const { data } = await axios.post(`${baseUrl}/login`, {
        login: user.login,
        password: user.password,
        location: { y: 37.5420654, x: 55.808093 },
      })
      if (data) {
        expect(data.token === undefined).toBe(false)
        // users[user.login].rating += 2
        tokens[user.login] = data.token
        delete data.token
      }
      expect(data).toEqual(successResponce)
    })
  },

  registerUser(login) {

    const request = { ...registerTemplate, login }

    test(`register, (${request.login}: Регистрация пользователя ${request.login})`, async () =>  {
      console.log(request)
      const { data } = await axios.post(`${baseUrl}/register`, request)
      expect(data).toEqual(successResponce)
    })
    
    this.users[login] = {
      ...request,
      age: null,
      biography: "",
      gender: 3,
      images: [],
      isFilled: false,
      preference: 3,
      tags: [],
      rating: 0,
      geoLoc: null,
      realLocation: null,
    }
  },

  likeUser(from, to, isLike, desc) {

    test(`like-user/, (${desc})`, async () => {
      let data
      let error
      try {
        data = (await axios.post(`${baseUrl}/like-user/${to}/${isLike}`, {}, {
          headers: { "Authorization": tokens[from] }
        })).data
        history.push({
          from,
          to,
          isLike,
        })
      } catch({ response }) {
        error = response
      }
      console.log(history)
      if (data) expect(data).toEqual(successResponce)
      else if (error) expect(error.status).toEqual(401)
    })
    
  },

  profileUpdate(login) {

    const num = login.split('_')[1]
    const randomProfile = generateUser()
    delete randomProfile.login
    delete randomProfile.isFilled
    delete randomProfile.password
    delete randomProfile.rating
    delete randomProfile.dist
    if (num < 5) randomProfile.location = null

    test(`profile-update/, (${login}: Обновление профиля для ${login})`, async () => {
      let data
      let error
      try {
        data = (await axios.post(`${baseUrl}/profile-update`, randomProfile, {
          headers: { "Authorization": tokens[login] }
        })).data
        this.users[login] = { ...this.users[login], ...randomProfile, isFilled: true }
      } catch({ response }) {
        error = response
      }
      if (data) expect(data).toEqual(successResponce)
      else if (error) expect(error.status).toEqual(401)
    })

  }
}

describe('API', () => {

  const count = 10

  test(`clear, (ckear)`, async () => {
    let data
    let error
    try {
      data = (await axios.get(`${baseUrl}/clear`)).data
    } catch({ response }) {
      error = response
    }
    if (data) expect(data).toEqual(successResponce)
    else if (error) expect(error.status).toEqual(401)
  })
  
  // register
  Array.from(Array(count).keys()).forEach(num => store.registerUser(`User_${num}`))
  
  // login
  Array.from(Array(count).keys()).forEach(num => store.loginUser(`User_${num}`))

  // profile-get
  Array.from(Array(count).keys()).forEach(num => store.getUserProfile(`User_${num}`, `User_${num}`))
  
  store.getUserProfile('User_0', 'User_1', 'Получение профиля пользователя User_1')
  store.getUserProfile('User_0', 'User_8', 'Получение профиля пользователя User_8 (не заполнивший профиль возвращает ошибку)')
  store.getUserProfile('User_0', 'User_18', 'Получение профиля пользователя User_18 (не существует и возвращает ошибку)')

  // profile-update
  Array.from(Array(count - 2).keys()).forEach(num => {
    const user = 'User_' + num
    store.profileUpdate(user)
    store.getUserProfile(user, user, `${user}: Получение профиля после обновления`)
  })

  // // store.getUserProfile('User_0', 'User_8', 'Получение профиля пользователя User_8 (теперь профиль заполнен)')

  // store.likeUser('User_0', 'User_1', 1, 'User_0: Пользователь поставил лайк User_1')
  // store.likeUser('User_1', 'User_0', 1, 'User_1: Пользователь поставил лайк User_0')
  // store.getUserProfile('User_0', 'User_1', `User_0: Получение профиля после лайков`)
  // store.getUserProfile('User_1', 'User_0', `User_1: Получение профиля после лайков`)


  // store.likeUser('User_1', 'User_2', 1, 'User_1: Пользователь поставил лайк User_0')
  // store.likeUser('User_1', 'User_3', 1, 'User_1: Пользователь поставил лайк User_0')
  // store.likeUser('User_1', 'User_2', 0, 'User_1: Пользователь убрал лайк User_0')

  // store.getUserProfile('User_0', 'User_0', `User_0: Получение профиля после лайков`)
  // store.getUserProfile('User_0', 'User_2', `User_0: Получение профиля после лайков`)
  // store.getUserProfile('User_0', 'User_3', `User_0: Получение профиля после лайков`)


  
//   // get-users
//   getUsers.requests.forEach(req => {
//     test(`${req.path}, (${req.desc})`, async () => {
//       const [user,] = req.desc.split(':')
//       if (req.request.activationCode === 'valid token') {
//         req.request.activationCode = tokens[user]
//       }
//       let data
//       let error
//       try {
//         data = (await axios.post(baseUrl + req.path, req.request)).data
//       } catch({ response }) {
//         error = response
//       }
//       if (data) expect(data).toEqual(req.expect)
//       else if (error) expect(error.status).toEqual(401)
//     })
//   })
  
//   // like-user
//   likeUser.requests.forEach(req => {
//     test(`${req.path}, (${req.desc})`, async () => {
//       const [user,] = req.desc.split(':')
//       if (req.request.activationCode === 'valid token') {
//         req.request.activationCode = tokens[user]
//       }
//       let data
//       let error
//       try {
//         data = (await axios.post(baseUrl + req.path, req.request)).data
//       } catch({ response }) {
//         error = response
//       }
//       if (data && (req.path === '/history' || req.path === '/notifications')) {
//         data.data.forEach(action => {
//           let created = action.created
//           expect(created === undefined).toBe(false)
//           delete action.created
//         })
//       }
//       if (data) expect(data).toEqual(req.expect)
//       else if (error) expect(error.status).toEqual(401)
//     })
//   })

//   // visit
//   visit.requests.forEach(req => {
//     test(`${req.path}, (${req.desc})`, async () => {
//       const [user,] = req.desc.split(':')
//       if (req.request.activationCode === 'valid token') {
//         req.request.activationCode = tokens[user]
//       }
//       let data
//       let error
//       try {
//         data = (await axios.post(baseUrl + req.path, req.request)).data
//       } catch({ response }) {
//         error = response
//       }
//       if (data && (req.path === '/history' || req.path === '/notifications')) {
//         data.data.forEach(action => {
//           let created = action.created
//           expect(created === undefined).toBe(false)
//           delete action.created
//         })
//       }
//       if (data) expect(data).toEqual(req.expect)
//       else if (error) expect(error.status).toEqual(401)
//     })
//   })

//   // messages
//   messages.requests.forEach(req => {
//     test(`${req.path}, (${req.desc})`, async () => {
//       const [user,] = req.desc.split(':')
//       if (req.request.activationCode === 'valid token') {
//         req.request.activationCode = tokens[user]
//       }
//       let data
//       let error
//       try {
//         data = (await axios.post(baseUrl + req.path, req.request)).data
//       } catch({ response }) {
//         error = response
//       }
//       if (data && (['/send-message'].includes(req.path))) {
//         let created = data.data.created
//         expect(created === undefined).toBe(false)
//         delete data.data.created
//       }
//       if (data && (['/history', '/notifications', '/get-messages'].includes(req.path))) {
//         data.data.forEach(action => {
//           let created = action.created
//           expect(created === undefined).toBe(false)
//           delete action.created
//         })
//       }
//       if (data) expect(data).toEqual(req.expect)
//       else if (error) expect(error.status).toEqual(401)
//     })
//   })

//   // // logout
//   // logout.requests.forEach(req => {
//   //   test(`${req.path}, (${req.desc})`, async () => {
//   //     const [user,] = req.desc.split(':')
//   //     if (req.request.activationCode === 'valid token') {
//   //       req.request.activationCode = tokens[user]
//   //     }
//   //     try {
//   //       const { data } = await axios.post(baseUrl + req.path, req.request)
//   //       expect(data).toEqual(req.expect)
//   //     } catch({ response }) {
//   //       expect(response.status).toEqual(401)
//   //     }
//   //   })
//   // })
  
})
