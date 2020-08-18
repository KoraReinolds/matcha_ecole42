const mongo = require('../db/mongo');
const a = require('async');
const { Schema } = require('../db/mongo');

let schema = new mongo.Schema({
  action: {
    type: String,
    required: true,
  },
  who: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  target: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  created: {
    type: Date,
    default: Date.now,
  },
})

schema.statics.getUsersWhoLikeMe = function(req, callback) {
  this.find({ target: req.user._id})
    .populate('who', '-__v, -salt -token -_id -filledInformation -hashedPassword -email')
    .select('who created -_id')
    .exec((err, users) => {
      console.log(users)
      if (err) return callback(err);
      callback(null, { type: "ok", message: "", data: users });
    })
};

schema.statics.getMyLikes = function(req, callback) {
  this.find({ who: req.user._id})
    .populate('target', '-__v, -salt -token -_id -filledInformation -hashedPassword -email')
    .select('target created -_id')
    .exec((err, users) => {
      console.log(users)
      if (err) return callback(err);
      callback(null, { type: "ok", message: "", data: users });
    })
};

exports.Actions = mongo.model('Actions', schema);