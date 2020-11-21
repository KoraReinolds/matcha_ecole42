const mongo = require('./mongo')
const a = require('async')
const dataGenerator = require('../dataGeneration')

a.series([
  open,
  dropDatabase,
  requireModels,
  createUsers
], function(err) {
  mongo.disconnect()
  process.exit(err ? 255 : 0)
})

function open(callback) {
  mongo.connection.on("open", callback)
}

function dropDatabase(callback) {
  let db = mongo.connection.db
  db.dropDatabase(callback)
}

function requireModels(callback) {
  require('../models/user')()

  a.each(Object.keys(mongo.models), (modelName, callback) => {
    mongo.models[modelName].ensureIndexes(callback)
  }, callback)
}

function createUsers(callback) {

  let users = dataGenerator.generateUsers(0)
  users.push({
    isFilled:  true,
    location:           { x: 37.616565, y: 55.751640 },
    login:              "User_1",
    fname:              "first",
    lname:              "last",
    password:           "123",
    email:              "reinoldskora@gmail.com",
    age:                24,
    rating:        0,
    gender:             "male",
    preference:         ["male"],
    biography:          "my name is Jack my name is Jack my name is Jack my name is Jack my name is Jack",
    tags:               ["poker", "work"],
    images: [
      {
        index: 0,
        avatar: true,
        src: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
      },
      {
        index: 1,
        avatar: false,
        src: "https://images.thenorthface.com/is/image/TheNorthFaceEU/CF8C_15Q_hero?$638x745$"
      },
      {
        index: 2,
        avatar: false,
        src: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
      },
      {
        index: 3,
        avatar: false,
        src: "https://images.thenorthface.com/is/image/TheNorthFaceEU/CF8C_15Q_hero?$638x745$"
      },
    ],
  })

  a.each(users, (userData, callback) => {
    new mongo.models.User({
      ...userData,
      geoLoc: {
        type: "Point",
        // coordinates: [userData.location.y, userData.location.x],
        // coordinates: [ 55.751640, 37.616565 ],
        // coordinates: [ 37.616565, 55.751640 ],
        coordinates: [ 0.3, 0.3 ],

      },
    }).save(callback)
  }, callback)
}
