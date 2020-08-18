const crypto = require('crypto');
const mongo = require('../db/mongo');
const a = require('async');
require('./actions');
const { forEach } = require('../dataGeneration/sentences');

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

schema.statics.getUsers = async function(req, callback) {
  const options = req.body;
  const distance = function (point1, point2) {
    const diffX = Math.abs(point1.x - point2.x);
    const diffY = Math.abs(point1.y - point2.y);
    return Math.floor(Math.sqrt(diffX * diffX + diffY * diffY) * 111.3);
  };
  const docs = await this.find({
      login: { $ne: options.login },
      gender: { $in: options.preference },
      filledInformation: true,
      age: { $gt: options.minAge, $lt: options.maxAge },
      fameRaiting: { $gt: options.minRate, $lt: options.maxRate },
    })
    .sort(options.sortOrder)
    .select('-_id -salt -token -hashedPassword -__v -email -likeList')
    
  let filteredDocs = docs
    .filter((user) => {
      const dist = distance(user.curLocation || user.location,
        req.user.curLocation || req.user.location);
      user.dist = dist;
      return options.minDist <= dist && dist <= options.maxDist;
    })
  if (options.tags.length) {
    filteredDocs = filteredDocs.filter(
      (user) => options.tags.some((tag) => user.tags.includes(tag))
    )
  }
  filteredDocs.forEach((user) => {
    user.countTags = user.tags.reduce((sum, tag) => {
      console.log(+options.tags.includes(tag))
      return sum += +options.tags.includes(tag);
    }, 0)
  })
  filteredDocs.forEach((user) => {
    console.log(user.tags, user.countTags)
  })
  console.log(options.sortOrder)
  const sortFields = Object.keys(options.sortOrder);
  const sortLen = sortFields.length;
  let i = 0;
  const compare = function(a, b, i) {
    const field = sortFields[i];
    return (i === sortLen)
      ? 0 : (
        options.sortOrder[field] * (a[field] - b[field]) ||
        compare(a, b, i + 1)
      );
  };
  filteredDocs = filteredDocs.sort((a, b) => compare(a, b, 0))
  // filteredDocs.forEach((e) => console.log(e.dist))
  let res = {
    users: filteredDocs.slice(options.skip, options.skip + options.limit),
    length: filteredDocs.length,
  }
  // console.log(options.tags)
  callback(null, { type: "ok", message: "", data: res });
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
            callback(null, user)
          }
        );
      }
    },
    (user, callback) => {
      new mongo.models.Actions({
        who: req.user._id,
        action: req.body.action,
        target: user._id,
      }).save((err, action) => {
        mongo.models.Actions.getMyLikes(req, function() {callback})
        if (err) callback(null, { type: "error", message: "Невозможно выполнить операцию!" });
        callback(null, { type: "ok", message: "Данные успешно обновленны" })
      })
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