const mongo = require('./mongo');
const a = require('async');

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
  
  a.each(Object.keys(mongo.models), function(modelName, callback) {
    mongo.models[modelName].ensureIndexes(callback);
  }, callback);
}

function createUsers(callback) {

  let users = [
    {login: 'Вася', password: '123'},
    {login: 'Петя', password: '123'},
    {login: 'admin', password: '123'}
  ];

  a.each(users, function(userData, callback) {
    new mongo.models.User(userData).save(callback);
  }, callback);
}
