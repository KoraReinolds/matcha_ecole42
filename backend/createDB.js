const mongo = require('./mongo');
const a = require('async');
const dataGenerator = require('./dataGeneration');

a.series([
  open,
  dropDatabase,
  requireModels,
  createUsers
], function(err) {
  mongo.disconnect();
  process.exit(err ? 255 : 0);
});

function open(callback) {
  mongo.connection.on("open", callback);
}

function dropDatabase(callback) {
  let db = mongo.connection.db;
  db.dropDatabase(callback)
}

function requireModels(callback) {
  require('./models/user');
  
  a.each(Object.keys(mongo.models), (modelName, callback) => {
    mongo.models[modelName].ensureIndexes(callback);
  }, callback);
}

function createUsers(callback) {

  let users = dataGenerator.generateUsers(10);

  a.each(users, (userData, callback) => {
    new mongo.models.User(userData).save(callback);
  }, callback);
}
