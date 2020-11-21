module.exports = function(io) {
  const crypto = require('crypto')
  const mongo = require('../db/mongo')
  const a = require('async')

  const pointSchema = new mongo.Schema({
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
    }
  })

  const getLocation = function() {
    console.log("here ", this.geoLoc ?
      {
        x: this.geoLoc.coordinates[0],
        y: this.geoLoc.coordinates[1]
      } : null)
    return this.geoLoc ?
      {
        x: this.geoLoc.coordinates[0],
        y: this.geoLoc.coordinates[1]
      } : null
  }

  let schema = new mongo.Schema({
    geoLoc: { // геолокация по которой ведутся расчеты дистанции, равна выбранной или реальной, если выбранная отсутствует
      type: pointSchema,
      index: '2dsphere',
    },
    realLocation: { // реальная геолокация пользователя, обновляется при логине
      type: Object,
    },
    location: { // выбранная пользователем геолокация, обновляется при изменении профиля
      type: Object,
      // get: getLocation,
    },
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
    fameRaiting: {
      type: Number,
    },
    filledInformation: {
      type: Boolean,
    },
  }, { toJSON: { getters: true } })
  
  schema.statics.getUsersForChat = async function(req, callback) {
    const docs = await this.find({
      login: { $in: req.user.likeList },
    })
      .select('-_id -salt -token -hashedPassword -__v -email -created')
    let filteredDocs = docs
      .filter((user) => user.likeList.includes(req.user.login))
    callback(null, { type: "ok", message: "", data: filteredDocs })
  }

  schema.statics.getUsers = require('./get_users')
  
  schema.statics.login = require('./login')
  
  schema.statics.logout = async (req) => {

    await this.findOneAndUpdate({ login: req.user.login }, { token: '' })

    return { type: "ok" }

  }
  
  schema.statics.updateUser = require('./profile_update')
  
  schema.statics.getUserByName = require('./get_profile')
    
  schema.statics.likeUser = function(req, callback) {
    const User = this
  
    a.waterfall([
      (callback) => {
        User.findOne({login: req.body.login}, callback)
      },
      (user, callback) => {
        if (!user) {
          callback(null, { type: "error", message: "Невозможно выполнить операцию!" })
        } else {
          User.findOneAndUpdate(
            { login: req.user.login },
            { likeList: req.body.likeList },
            function(err, doc) {
              if (err) callback(404)
              callback(null, user)
            }
          )
        }
      },
      (user, callback) => {
        new mongo.models.Actions({
          who: req.user._id,
          action: req.body.action,
          target: user._id,
        }).save((err, action) => {
          if (err) callback(null, { type: "error", message: "Невозможно выполнить операцию!" })
          io.emit(user.login, {
            action:         action.action,
            created:        action.created, 
            who: {
              age:          req.user.age,
              avatar:       req.user.avatar,
              biography:    req.user.biography,
              created:      req.user.created,
              fameRaiting:  req.user.fameRaiting,
              fname:        req.user.fname,
              gender:       req.user.gender,
              images:       req.user.images,
              likeList:     req.user.likeList,
              lname:        req.user.lname,
              location:     req.user.location,
              login:        req.user.login,
              preference:   req.user.preference,
              tags:         req.user.tags,
            }
          })
          callback(null, { type: "ok", message: "Данные успешно обновленны" })
        })
      }
    ], callback)
  }
  
  schema.statics.registration = require('./registration')
  
  schema.virtual('password')
    .set(function(password) {
      this._plainPassword = password
      this.salt = Math.random() + ''
      this.token = ''
      this.hashedPassword = this.encryptPassword(password)
    })
    .get(function() { return this._plainPassword })
  
  schema.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword
  }

  schema.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
  }

  schema.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
  }

  const User = mongo.model('User', schema)

  return User

}