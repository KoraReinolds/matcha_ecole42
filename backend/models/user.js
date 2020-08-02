const crypto = require('crypto');
const mongo = require('../mongo');
const a = require('async');

let schema = new mongo.Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  fname: {
    type: String,
    required: true,
  },
  location: {
    type: Object,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  }
})

schema.methods.generateSessionToken = function(user, callback) {
  crypto.randomBytes(48, (err, buffer) => {
    console.log(user)
    user.token = buffer.toString('hex');
    user.save((err) => {
      if (err) return callback(err);
      callback(null, user.token);
    });
  });
};

schema.methods.encryptPassword = function(password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.statics.login = function(body, callback) {
  const User = this;

  a.waterfall([
    (callback) => {
      User.findOne({login: body.login}, callback);
    },
    (user, callback) => {
      if (!user) {
        callback(null, ["error", "Неверное имя пользователя или пароль"]);
      } else {
        if (user.checkPassword(body.password)) {
          user.generateSessionToken(user, (err, token) => {
            if (err) callback(err)
            console.log(token)
            callback(null, ["ok", token]);
          })
        } else {
          callback(null, ["error", "Неверное имя пользователя или пароль"]);
        }
      }
    }
  ], callback);
};

schema.statics.registration = function(body, callback) {
  const User = this;

  a.waterfall([
    (callback) => {
      User.findOne({login: body.login}, callback);
    },
    (user, callback) => {
      if (user) {
        callback(null, ["error", "Пользователь с таким логином уже существует"]);
      } else {
        let user = new User(body);
        user.save((err) => {
          if (err) return callback(err);
          callback(null, ["ok", user.login]);
        });
      }
    }
  ], callback);
};

schema.virtual('password')
  .set(function(password) {
    this._plainPassword = password;
    this.salt = Math.random() + '';
    this.token = '';
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() { return this._plainPassword; });


schema.methods.checkPassword = function(password) {
  return this.encryptPassword(password) === this.hashedPassword;
};

exports.User = mongo.model('User', schema);