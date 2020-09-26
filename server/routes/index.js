
module.exports = function(io) {
  const express = require('express');
  const router = express.Router();
  const User = require('../models/user')(io);
  const Actions = require('../models/actions')(io);

  router.use((req, res, next) => {
    // console.log('Time: ', Date.now());
    User.findOne({token: req.body.activationCode}, (err, user) => {
      if (err) {
        res.send(JSON.stringify({ type: "error", message: "Произошла ошибка. Обратитесь к администратору", err, }));
      }
      req.user = user;
      // console.log("USER", user ? user.login : 'anon');
      next();
    });
  });

  router.post('/register', (req, res, next) => {
    User.registration(req.body, (err, params) => {
      if (err) next(err)
      else res.send(JSON.stringify(params));
    })
  })
  
  router.post('/login', (req, res, next) => {
    User.login(req.body, (err, params) => {
      if (err) next(err)
      else res.send(JSON.stringify(params));
    })
  })

  router.use((req, res, next) => {
    if (!req.user) {
      res.status(401).send();
    } else {
      next();
    }
  }),
  
  router.post('/send-message', (req, res, next) => {
    if (req.user) {
      Actions.sendMessage(req, (err, params) => {
        if (err) next(err)
        else res.send(JSON.stringify(params));
      })
    } else next();
  })
  
  router.post('/get-messages', (req, res, next) => {
    if (req.user) {
      Actions.getMessages(req, (err, params) => {
        if (err) next(err)
        else res.send(JSON.stringify(params));
      })
    } else next();
  })
  
  router.post('/chat-list', (req, res, next) => {
    if (req.user) {
      User.getUsersForChat(req, (err, params) => {
        if (err) next(err)
        else res.send(JSON.stringify(params));
      })
    } else next();
  })

  router.post('/history', (req, res, next) => {
    if (req.user) {
      Actions.getHistory(req, (err, params) => {
        if (err) next(err)
        else res.send(JSON.stringify(params));
      })
    } else next();
  })
  
  router.post('/notifications', (req, res, next) => {
    if (req.user) {
      Actions.getNotifications(req, (err, params) => {
        if (err) next(err)
        else res.send(JSON.stringify(params));
      })
    } else next();
  })
  
  router.post('/like-user', (req, res, next) => {
    if (req.user) {
      User.likeUser(req, (err, params) => {
        if (err) next(err)
        else res.send(JSON.stringify(params));
      })
    } else next();
  })
  
  router.post('/get-users', (req, res, next) => {
    req.body.login = req.user.login;
    User.getUsers(req, (err, params) => {
      if (err) next(err)
      else res.send(JSON.stringify(params));
    })
  })
  
  router.post('/profile-update', (req, res, next) => {
    if (req.user) {
      User.updateUser(req, (err, params) => {
        if (err) next(err)
        else res.send(JSON.stringify(params));
      })
    } else next();
  })

  router.post('/logout', (req, res, next) => {
    User.logout(req, (err, params) => {
      if (err) next(err)
      else res.send(JSON.stringify(params));
    })
  })
  
  router.post('/profile-get', (req, res, next) => {
    if (req.user) {
      User.getUserByName(req, (err, params) => {
        if (err) next(err)
        else res.send(JSON.stringify(params));
      })
    } else next();
  })
  
  router.get('/', (req, res, next) => {
    res.send("API matcha");
  })

  router.use((req, res, next) => {
    res.send(JSON.stringify({
      type: "error",
      message: "Произошла ошибка. Обратитесь к администратору",
    }));
  });

  return router;
};