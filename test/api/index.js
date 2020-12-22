import axios from 'axios'
const { generateUser } = require('../../server/dataGeneration/index')

const baseUrl = "https://matcha-server.herokuapp.com"
// const baseUrl = 'http://localhost:4567'
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

export default {

  users: {},

  countArray: [],

  async clearDB() {
    return await axios.get(`${baseUrl}/clear`)
  },

  setCount(num) {
    this.countArray = Array.from(Array(num).keys())
  },

  async registerAll() {
    return await Promise.all(this.countArray.map(num => this.registerUser(`User_${num}`)))
  },


  async registerUser(login) {

    const request = { ...registerTemplate, login }

    const { data } = await axios.post(`${baseUrl}/register`, request)
    
    this.users[login] = {
      ...request,
      age: 0,
      isBlocked: false,
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

    return data
  },

  async loginAll() {
    return await Promise.all(this.countArray.map(num => this.loginUser(`User_${num}`)))
  },

  async loginUser(login) {

    const user = this.users[login]

    const { data } = await axios.post(`${baseUrl}/login`, {
      login: user.login,
      password: user.password,
      location: { y: 37.5420654, x: 55.808093 },
    })
    tokens[user.login] = data.token
    delete data.token

    return data
  },

  async profileUpdateAll() {
    return await Promise.all(this.countArray.map(num => this.profileUpdate(`User_${num}`)))
  },

  async profileUpdate(login) {

    const num = login.split('_')[1]
    const randomProfile = generateUser()
    delete randomProfile.login
    delete randomProfile.isFilled
    delete randomProfile.password
    delete randomProfile.rating
    delete randomProfile.dist
    if (num < 5) randomProfile.location = null

    let data = (await axios.post(`${baseUrl}/profile-update`, randomProfile, {
      headers: { "Authorization": tokens[login] }
    })).data
    randomProfile.geoLoc = randomProfile.location
    delete randomProfile.location
    this.users[login] = { ...this.users[login], ...randomProfile, isFilled: true }

    return data
  },

  async likeUser(from, to, isLike) {

    let data
    data = (await axios.post(`${baseUrl}/like-user`, {
      login: to,
      value: isLike ? 1 : 0
    }, {
      headers: { "Authorization": tokens[from] }
    })).data
    history.push({
      from,
      to,
      isLike,
    })
    return data
    
  },







  getOtherProfile(loginFrom, loginTo) {

    const q1 = history.filter(user => user.to === loginTo && user.from === loginFrom)
    const q2 = history.filter(user => user.to === loginFrom && user.from === loginTo)
    // console.log(loginFrom, loginTo, q1, q2, history)
    const user = { ...this.users[loginTo] }
    user.location = user.geoLoc || user.realLocation
    delete user.password
    delete user.geoLoc
    delete user.realLocation
    delete user.email
    user.likedFrom = q1.length ? q1.reverse()[0].isLike === 1 : false
    user.likedTo = q2.length ? q2.reverse()[0].isLike === 1 : false
    const resp = this.users[loginTo] && this.users[loginTo].isFilled ? {
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
        if (data.data.rating) data.data.rating = 0
        if (data.data.time) delete data.data.time
        expect(data).toEqual(myProfile ? store.getMyProfile(loginFrom) : store.getOtherProfile(loginFrom, loginTo))
      } else if (error) {
        expect(error.status).toEqual(401)
      }
    })
  },

}


// describe('API', () => {

//   const count = 10

//   test(`clear, (ckear)`, async () => {
//     let data
//     let error
//     try {
//       data = (await axios.get(`${baseUrl}/clear`)).data
//     } catch({ response }) {
//       error = response
//     }
//     if (data) expect(data).toEqual(successResponce)
//     else if (error) expect(error.status).toEqual(401)
//   })
  
//   // register
//   Array.from(Array(count).keys()).forEach(num => store.registerUser(`User_${num}`))
  
//   // login
//   Array.from(Array(count).keys()).forEach(num => store.loginUser(`User_${num}`))

//   // profile-get
//   Array.from(Array(count).keys()).forEach(num => store.getUserProfile(`User_${num}`, `User_${num}`))
  
//   // store.getUserProfile('User_0', 'User_1', 'Получение профиля пользователя User_1')
//   // store.getUserProfile('User_0', 'User_8', 'Получение профиля пользователя User_8 (не заполнивший профиль возвращает ошибку)')
//   // store.getUserProfile('User_0', 'User_18', 'Получение профиля пользователя User_18 (не существует и возвращает ошибку)')

//   // profile-update
//   Array.from(Array(count - 2).keys()).forEach(num => {
//     const user = 'User_' + num
//     store.profileUpdate(user)
//     store.getUserProfile(user, user, `${user}: Получение профиля после обновления`)
//   })

//   // // store.getUserProfile('User_0', 'User_8', 'Получение профиля пользователя User_8 (теперь профиль заполнен)')

//   // store.likeUser('User_0', 'User_1', 1, 'User_0: Пользователь поставил лайк User_1')
//   // store.likeUser('User_1', 'User_0', 1, 'User_1: Пользователь поставил лайк User_0')
//   // store.getUserProfile('User_0', 'User_1', `User_0: Получение профиля после лайков`)
//   // store.getUserProfile('User_1', 'User_0', `User_1: Получение профиля после лайков`)
  
//   // store.likeUser('User_2', 'User_1', 1, 'User_2: Пользователь поставил лайк User_1')
//   // store.likeUser('User_1', 'User_2', 1, 'User_1: Пользователь поставил лайк User_2')
//   // store.getUserProfile('User_0', 'User_1', `User_1: Получение профиля после лайков`)
//   // store.getUserProfile('User_0', 'User_2', `User_1: Получение профиля после лайков`)
//   // store.getUserProfile('User_0', 'User_3', `User_1: Получение профиля после лайков`)
//   // store.likeUser('User_1', 'User_2', 1, 'User_1: Пользователь поставил лайк User_0')
//   // store.likeUser('User_1', 'User_3', 1, 'User_1: Пользователь поставил лайк User_0')
//   // store.likeUser('User_1', 'User_2', 0, 'User_1: Пользователь убрал лайк User_0')

//   // store.getUserProfile('User_0', 'User_1', `User_1: Получение профиля после лайков`)
//   // store.getUserProfile('User_0', 'User_2', `User_1: Получение профиля после лайков`)
//   // store.getUserProfile('User_0', 'User_3', `User_1: Получение профиля после лайков`)


  
// //   // get-users
// //   getUsers.requests.forEach(req => {
// //     test(`${req.path}, (${req.desc})`, async () => {
// //       const [user,] = req.desc.split(':')
// //       if (req.request.activationCode === 'valid token') {
// //         req.request.activationCode = tokens[user]
// //       }
// //       let data
// //       let error
// //       try {
// //         data = (await axios.post(baseUrl + req.path, req.request)).data
// //       } catch({ response }) {
// //         error = response
// //       }
// //       if (data) expect(data).toEqual(req.expect)
// //       else if (error) expect(error.status).toEqual(401)
// //     })
// //   })
  
// //   // like-user
// //   likeUser.requests.forEach(req => {
// //     test(`${req.path}, (${req.desc})`, async () => {
// //       const [user,] = req.desc.split(':')
// //       if (req.request.activationCode === 'valid token') {
// //         req.request.activationCode = tokens[user]
// //       }
// //       let data
// //       let error
// //       try {
// //         data = (await axios.post(baseUrl + req.path, req.request)).data
// //       } catch({ response }) {
// //         error = response
// //       }
// //       if (data && (req.path === '/history' || req.path === '/notifications')) {
// //         data.data.forEach(action => {
// //           let created = action.created
// //           expect(created === undefined).toBe(false)
// //           delete action.created
// //         })
// //       }
// //       if (data) expect(data).toEqual(req.expect)
// //       else if (error) expect(error.status).toEqual(401)
// //     })
// //   })

// //   // visit
// //   visit.requests.forEach(req => {
// //     test(`${req.path}, (${req.desc})`, async () => {
// //       const [user,] = req.desc.split(':')
// //       if (req.request.activationCode === 'valid token') {
// //         req.request.activationCode = tokens[user]
// //       }
// //       let data
// //       let error
// //       try {
// //         data = (await axios.post(baseUrl + req.path, req.request)).data
// //       } catch({ response }) {
// //         error = response
// //       }
// //       if (data && (req.path === '/history' || req.path === '/notifications')) {
// //         data.data.forEach(action => {
// //           let created = action.created
// //           expect(created === undefined).toBe(false)
// //           delete action.created
// //         })
// //       }
// //       if (data) expect(data).toEqual(req.expect)
// //       else if (error) expect(error.status).toEqual(401)
// //     })
// //   })

// //   // messages
// //   messages.requests.forEach(req => {
// //     test(`${req.path}, (${req.desc})`, async () => {
// //       const [user,] = req.desc.split(':')
// //       if (req.request.activationCode === 'valid token') {
// //         req.request.activationCode = tokens[user]
// //       }
// //       let data
// //       let error
// //       try {
// //         data = (await axios.post(baseUrl + req.path, req.request)).data
// //       } catch({ response }) {
// //         error = response
// //       }
// //       if (data && (['/send-message'].includes(req.path))) {
// //         let created = data.data.created
// //         expect(created === undefined).toBe(false)
// //         delete data.data.created
// //       }
// //       if (data && (['/history', '/notifications', '/get-messages'].includes(req.path))) {
// //         data.data.forEach(action => {
// //           let created = action.created
// //           expect(created === undefined).toBe(false)
// //           delete action.created
// //         })
// //       }
// //       if (data) expect(data).toEqual(req.expect)
// //       else if (error) expect(error.status).toEqual(401)
// //     })
// //   })

// //   // // logout
// //   // logout.requests.forEach(req => {
// //   //   test(`${req.path}, (${req.desc})`, async () => {
// //   //     const [user,] = req.desc.split(':')
// //   //     if (req.request.activationCode === 'valid token') {
// //   //       req.request.activationCode = tokens[user]
// //   //     }
// //   //     try {
// //   //       const { data } = await axios.post(baseUrl + req.path, req.request)
// //   //       expect(data).toEqual(req.expect)
// //   //     } catch({ response }) {
// //   //       expect(response.status).toEqual(401)
// //   //     }
// //   //   })
// //   // })
  
// })
