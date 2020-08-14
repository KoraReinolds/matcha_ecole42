const mongo = require('./mongo');
const a = require('async');
const dataGenerator = require('../dataGeneration');

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
  require('../models/user');
  
  a.each(Object.keys(mongo.models), (modelName, callback) => {
    mongo.models[modelName].ensureIndexes(callback);
  }, callback);
}

function createUsers(callback) {

  let users = dataGenerator.generateUsers(10);
  users.push({
    filledInformation:  true,
    location:           null,
    login:              "mskiles",
    fname:              "first",
    lname:              "last",
    password:           "123",
    email:              "reinoldskora@gmail.com",
    age:                24,
    fameRaiting:        1000,
    gender:             "male",
    preference:         ["male"],
    biography:          "my name is Jack my name is Jack my name is Jack my name is Jack my name is Jack",
    tags:               ["aaa", "bbb", "bbsb" ],
    images: [{
        "index": 0,
        "src": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
      },
      {
        "index": 1,
        "src": "https://images.thenorthface.com/is/image/TheNorthFaceEU/CF8C_15Q_hero?$638x745$"
      }
    ],
    avatar: 1,
    likeList: [],
  });

  a.each(users, (userData, callback) => {
    new mongo.models.User(userData).save(callback);
  }, callback);
}
