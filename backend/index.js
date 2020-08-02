const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require("body-parser");
const router = express.Router();
const auth = require('./routes/auth');
const cors = require('cors');
const User = require('./models/user').User;

router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  User.findOne({token: req.body.activationCode}, (err, user) => {
    if (err) {
      res.send(JSON.stringify({ type: "error", message: "Произошла ошибка. Обратитесь к администратору", err, }));
    }
    req.user = user;
    next();
  });
});

const app = express();
const port = 4000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router);
app.use('/', auth);

http.createServer(app).listen(port, function() {
  console.log('Express server listening on port ' + port);
});