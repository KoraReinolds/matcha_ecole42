const express = require('express');
const router = express.Router();
const User = require('../models/user').User;
const Actions = require('../models/actions').Actions;


router.post('/history', (req, res, next) => {
  Actions.getHistory(req, (err, params) => {
    if (err) next(err)
    else res.send(JSON.stringify(params));
  })
})

router.post('/notifications', (req, res, next) => {
  Actions.getNotifications(req, (err, params) => {
    if (err) next(err)
    else res.send(JSON.stringify(params));
  })
})

router.post('/like-user', (req, res, next) => {
  User.likeUser(req, (err, params) => {
    if (err) next(err)
    else res.send(JSON.stringify(params));
  })
})

router.post('/get-users', (req, res, next) => {
  req.body.login = req.user.login;
  User.getUsers(req, (err, params) => {
    if (err) next(err)
    else res.send(JSON.stringify(params));
  })
})

router.post('/profile-update', (req, res, next) => {
  User.updateUser(req, (err, params) => {
    if (err) next(err)
    else res.send(JSON.stringify(params));
  })
})

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

router.post('/profile-get', (req, res, next) => {
  User.getUserByName(req, (err, params) => {
    if (err) next(err)
    else res.send(JSON.stringify(params));
  });
})

router.get('/', (req, res, next) => {
  res.send("API matcha");
})

module.exports = router;