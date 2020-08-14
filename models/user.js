const crypto = require('crypto');
const mongo = require('../db/mongo');
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
  age: {
    type: Number,
  },
  location: {
    type: Object,
  },
  curLocation: {
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
  fameRaiting: {
    type: Number,
  },
  likeList: {
    type: Array,
  },
  filledInformation: {
    type: Boolean,
  },
})

schema.statics.getUsers = function(options, callback) {
  this.find({ login: { $ne: options.login } }, { _id: 0, salt: 0, token: 0, hashedPassword: 0, __v: 0, email: 0, likeList: 0 })
    .where('filledInformation').equals(true)
    .exec((err, users) => {
      if (err) return callback(err);
      let res = {
        users: users.slice(options.skip, options.skip + options.limit),
        length: users.length,
      }
      callback(null, { type: "ok", message: "", data: res });
    })
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
            user.curLocation = body.location;
            user.save((err) => {
              if (err) return callback(err);
              callback(null, { type: "ok", token });
            });
          })
        } else {
          callback(null, { type: "error", message: "Неверное имя пользователя или пароль" });
        }
      }
    }
  ], callback);
};

schema.statics.updateUser = async function(req, callback) {
  console.log(req.user);
  if (req.user) {
    await this.findOneAndUpdate({ login: req.user.login }, { ...req.body, filledInformation: true });
    callback(null, { type: "ok", message: "Данные успешно обновленны" });
  } else {
    callback(403)
  }
}

schema.statics.getUserByName = function(req, callback) {
  const User = this;
  const name = req.body.login === undefined ? req.user.login : req.body.login;

  User.findOne({login: name},
    { _id: 0, salt: 0, token: 0, hashedPassword: 0, __v: 0 },
    (err, data) => {
      if (err) return callback(err);
      callback(null, { type: "ok", message: "", data });
    })
}

schema.statics.likeUser = function(req, callback) {
  const User = this;

  a.waterfall([
    (callback) => {
      User.findOne({login: req.body.login}, callback);
    },
    (user, callback) => {
      if (!user) {
        callback(null, { type: "error", message: "Невозможно выполнить операцию!" });
      } else {
        User.findOneAndUpdate(
          { login: req.user.login },
          { likeList: req.body.likeList },
          function(err, doc) {
            if (err) callback(404)
            callback(null, { type: "ok", message: "Данные успешно обновленны" })
          }
        );
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
          filledInformation: false,
          age: null,
          fameRaiting: 0,
          gender: '',
          preferences: [],
          biography: '',
          tags: [],
          images: [],
          avatar: -1,
          likeList: [],
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

exports.User = mongo.model('User', schema);