const express = require('express');
const router = express.Router();
const User = require('../models/user').User;

router.post('/register', (req, res) => {
  User.registration(req.body, (err, params) => {
    let [type, msg] = params;
    if (err) {
      type = "error";
      msg = "Произошла ошибка. Обратитесь к администратору";
    }
    res.send(JSON.stringify({ type, msg }))
  })
})

module.exports = router;