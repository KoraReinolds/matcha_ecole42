const mongo = require('./mongo')
const a = require('async')

a.series([
  open,
  dropDatabase,
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
