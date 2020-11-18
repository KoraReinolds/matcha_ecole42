module.exports = function(io) {
  const crypto = require('crypto')
  const mongo = require('../db/mongo')
  const a = require('async')
  
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
    choosenLocation: {
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
    fameRaiting: {
      type: Number,
    },
    filledInformation: {
      type: Boolean,
    },
  })
  
  schema.statics.getUsersForChat = async function(req, callback) {
    const docs = await this.find({
      login: { $in: req.user.likeList },
    })
      .select('-_id -salt -token -hashedPassword -__v -email -created')
    let filteredDocs = docs
      .filter((user) => user.likeList.includes(req.user.login))
    callback(null, { type: "ok", message: "", data: filteredDocs })
  }

  schema.statics.getUsers = async function(req, callback) {
    const options = req.body
    // const distance = function (point1, point2) {
    //   const diffX = Math.abs(point1.x - point2.x)
    //   const diffY = Math.abs(point1.y - point2.y)
    //   return Math.floor(Math.sqrt(diffX * diffX + diffY * diffY) * 111.3)
    // }
    const docs = await this.find({
        login: { $ne: options.login },
        gender: { $in: options.preference },
        filledInformation: true,
        age: { $gt: +options.minAge - 1, $lt: +options.maxAge + 1 },
        fameRaiting: { $gt: +options.minRate - 1, $lt: +options.maxRate + 1 },
      })
      .sort(options.sortOrder)
      .select('-_id -salt -token -hashedPassword -__v -email -likeList -created')
    let filteredDocs = docs
      // .filter((user) => {
      //   const dist = distance(user.choosenLocation || user.location,
      //     req.user.choosenLocation || req.user.location)
      //   user.dist = dist
      //   return options.minDist <= dist && dist <= options.maxDist
      // })
    if (options.tags.length) {
      filteredDocs = filteredDocs.filter(
        (user) => options.tags.some((tag) => user.tags.includes(tag))
      )
    }
    filteredDocs.forEach((user) => {
      user.countTags = user.tags.reduce((sum, tag) => {
        return sum += +options.tags.includes(tag)
      }, 0)
    })
    const sortFields = Object.keys(options.sortOrder)
    const sortLen = sortFields.length
    let i = 0
    const compare = function(a, b, i) {
      const field = sortFields[i]
      return (i === sortLen)
        ? 0 : (
          options.sortOrder[field] * (a[field] - b[field]) ||
          compare(a, b, i + 1)
        )
    }
    filteredDocs = filteredDocs.sort((a, b) => compare(a, b, 0))
    let res = {
      users: filteredDocs.slice(options.skip, options.skip + options.limit),
      length: filteredDocs.length,
    }
    callback(null, { type: "ok", message: "", data: res })
  }
  
  schema.statics.login = async (body) => {
  
    const user = await User.findOne({ login: body.login })

    if (!user || !user.checkPassword(body.password)) {
      return { type: "error", message: "Неверное имя пользователя или пароль" }
    }

    const buffer = await crypto.randomBytes(48)
    console.log('body.location ', body)
    user.location = body.location
    user.token = buffer.toString('hex')
    await user.save()

    return { type: "ok", token: user.token }

  }
  
  schema.statics.logout = async (req) => {
    await this.findOneAndUpdate({ login: req.user.login }, { token: '' })
    return { type: "ok" }
  }
  
  schema.statics.updateUser = async (req) => {
    await User.findOneAndUpdate({ login: req.user.login }, { ...req.body, filledInformation: true })
    return { type: "ok", message: "Данные успешно обновленны" }
  }
  
  schema.statics.getUserByName = async (req) => {

    const login = req.body.login || req.user.login

    const user = await User.findOne({ login })
      .select('-salt -token -hashedPassword -__v -created')

    if (!user) {
      return { type: "error", message: "User not found" }
    }
    console.log(user.location)
    return { type: "ok", data: user }

  //   if (req.user.login !== login) {
  //     new mongo.models.Actions({
  //       who: req.user._id,
  //       action: 'visit',
  //       target: user._id,
  //     }).save((err, action) => {
  //       if (err) callback(null, { type: "error", message: "Error occurred on the server" })
  //       io.emit(user.login, {
  //         action:         action.action,
  //         created:        action.created, 
  //         who: {
  //           age:          req.user.age,
  //           avatar:       req.user.avatar,
  //           biography:    req.user.biography,
  //           created:      req.user.created,
  //           choosenLocation:  req.user.choosenLocation,
  //           fameRaiting:  req.user.fameRaiting,
  //           fname:        req.user.fname,
  //           gender:       req.user.gender,
  //           images:       req.user.images,
  //           likeList:     req.user.likeList,
  //           lname:        req.user.lname,
  //           location:     req.user.location,
  //           login:        req.user.login,
  //           preference:   req.user.preference,
  //           tags:         req.user.tags,
  //         }
  //       })
  //       user = JSON.parse(JSON.stringify(user))
  //       delete user._id
  //       callback(null, { type: "ok", message: "", data: user })
  //     })
  //   } else {
  //     user = JSON.parse(JSON.stringify(user))
  //     delete user._id
  //     callback(null, { type: "ok", message: "", data: user })
  //   }
  // }
  }
  
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
              // choosenLocation:  req.user.choosenLocation,
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
  
  schema.statics.registration = async (body) => {
    
    const user = await User.findOne({ login: body.login })

    if (user) {
      return { type: "error", message: "Пользователь с таким логином уже существует" }
    }

    const newUser = new User({
      ...body,
      filledInformation: false,
      age: null,
      fameRaiting: 0,
      gender: '',
      preferences: [],
      biography: '',
      tags: [],
      images: [],
    })
    await newUser.save()
    return { type: "ok" }
      
  }
  
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

  const User = mongo.model('User', schema)

  return User

}