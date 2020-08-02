const express = require('express');
const router = express.Router();
const User = require('../models/user').User;

router.post('/register', (req, res) => {
  User.registration(req.body, (err, params) => {
    let type = '';
    let message = '';
    if (err) {
      type = "error";
      message = "Произошла ошибка. Обратитесь к администратору";
    } else {
      [type, message] = params;
    }
    res.send(JSON.stringify({ type, message, err }));
  })
})

router.post('/login', (req, res) => {
  User.login(req.body, (err, params) => {
    let type = '';
    let message = '';
    if (err) {
      type = "error";
      message = "Произошла ошибка. Обратитесь к администратору";
    } else {
      [type, token] = params;
    }
    console.log(params);
    res.send(JSON.stringify({ type, message, token, err }));
  })
})

module.exports = router;