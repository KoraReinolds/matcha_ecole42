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
  created: {
    type: Date,
    default: Date.now,
  }
})

schema.methods.encryptPassword = function(password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
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
        user.save(function(err) {
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
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() { return this._plainPassword; });


schema.methods.checkPassword = function(password) {
  return this.encryptPassword(password) === this.hashedPassword;
};

exports.User = mongo.model('User', schema);