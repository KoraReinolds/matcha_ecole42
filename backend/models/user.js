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
  },
  biography: {
    type: String,
  },
  tags: {
    type: Array,
  },
  gender: {
    type: String,
  },
  preference: {
    type: Array,
  },
  images: {
    type: Object,
  },
  avatar: {
    type: Number,
  },
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
            callback(null, { type: "ok", token });
          })
        } else {
          callback(null, { type: "error", message: "Неверное имя пользователя или пароль" });
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
        callback(null, { type: "error", message: "Пользователь с таким логином уже существует" });
      } else {
        let user = new User({
          ...body,
          avatar: -1,
          biography: '',
          tags: [],
          gender: '',
          preferences: [],
          images: []
        });
        console.log(user);
        user.save((err) => {
          if (err) return callback(err);
          callback(null, { type: "ok", message: user.login });
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