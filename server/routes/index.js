
module.exports = function(io) {
  const express = require('express')
  const router = express.Router()
  const User = require('../models/user')(io)
  const Actions = require('../models/actions')(io)

  const errorHandleWrapper = function(callback) {
    return function (req, res, next) {
      callback(req, res, next)
        .catch(next)
    }
  }

  router.use(errorHandleWrapper(async (req, res, next) => {
    console.log('Cookies: ', req.cookies)

    let token = req.headers.authorization
    console.log(token)
    if (token) token = token.split(' ')[1]
    req.user = await User.findOne({token})
    next()
  }))
  
  router.get('/', (req, res, next) => {
    res.end(`Cookies: ${JSON.stringify(req.cookies)}`)
  })

  router.post('/register', errorHandleWrapper(async (req, res) => {
    res.json(await User.registration(req.body))
  }))

  router.post('/login', errorHandleWrapper(async (req, res) => {
    res.json(await User.login(req.body))
  }))

  router.use((req, res, next) => {

    if (!req.user) res.status(401).send()
    next()
  }),
  
  router.post('/send-message', (req, res, next) => {
    if (req.user) {
      Actions.sendMessage(req, (err, params) => {
        if (err) next(err)
        else res.send(JSON.stringify(params))
      })
    } else next()
  })
  
  router.post('/get-messages', (req, res, next) => {
    if (req.user) {
      Actions.getMessages(req, (err, params) => {
        if (err) next(err)
        else res.send(JSON.stringify(params))
      })
    } else next()
  })
  
  router.post('/chat-list', (req, res, next) => {
    if (req.user) {
      User.getUsersForChat(req, (err, params) => {
        if (err) next(err)
        else res.send(JSON.stringify(params))
      })
    } else next()
  })

  router.post('/history', (req, res, next) => {
    if (req.user) {
      Actions.getHistory(req, (err, params) => {
        if (err) next(err)
        else res.send(JSON.stringify(params))
      })
    } else next()
  })
  
  router.post('/notifications', (req, res, next) => {
    if (req.user) {
      Actions.getNotifications(req, (err, params) => {
        if (err) next(err)
        else res.send(JSON.stringify(params))
      })
    } else next()
  })
  
  router.post('/like-user', (req, res, next) => {
    if (req.user) {
      User.likeUser(req, (err, params) => {
        if (err) next(err)
        else res.send(JSON.stringify(params))
      })
    } else next()
  })
  
  router.post('/get-users', errorHandleWrapper(async (req, res) => {
    res.json(await User.getUsers({ ...req.body, login: req.user.login }))
  }))
  
  router.post('/profile-update', errorHandleWrapper(async (req, res) => {
    res.json(await User.updateUser(req))
  }))

  router.post('/logout', errorHandleWrapper(async (req, res) => {
    res.json(await User.logout(req))
  }))
  
  router.get('/profile-get', errorHandleWrapper(async (req, res) => {
    res.json(await User.getUserByName(req))
  }))

  router.use((req, res, next) => {
    res.json({
      type: "error",
      message: "Произошла ошибка. Обратитесь к администратору",
    })
  })

  return router
}