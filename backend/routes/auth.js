const express = require('express');
const router = express.Router();
const User = require('../models/user').User;

router.post('/register', (req, res) => {
  User.registration(req.body, (err, params) => {
    if (err) {
      params.type = "error";
      params.message = "Произошла ошибка. Обратитесь к администратору";
    }
    res.send(JSON.stringify(params));
  })
})

router.post('/login', (req, res) => {
  User.login(req.body, (err, params) => {
    if (err) {
      params.type = "error";
      params.message = "Произошла ошибка. Обратитесь к администратору";
    }
    res.send(JSON.stringify(params));
  })
})

router.post('/profile-get', (req, res) => {
  User.findOne({login: req.body.login},
    { _id: 0, salt: 0, token: 0, hashedPassword: 0, __v: 0 },
    (err, data) => {
      let type = "ok";
      let message = "";
      if (err) {
        type = "error";
        message = "Произошла ошибка. Обратитесь к администратору";
      } else if (!data) {
        type = "error";
        message = "Пользователь не найден";
      }
      res.send(JSON.stringify({ type, message, err, data }));
    });
})

module.exports = router;