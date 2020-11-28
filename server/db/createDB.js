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
