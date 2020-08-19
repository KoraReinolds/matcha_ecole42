module.exports = function(io) {

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

  schema.statics.getNotifications = function(req, callback) {
    this.find({ target: req.user._id})
      .populate('who', '-__v, -salt -token -_id -filledInformation -hashedPassword -email')
      .select('who action created -_id')
      .exec((err, users) => {
        if (err) return callback(err);
        callback(null, { type: "ok", message: "", data: users });
      })
  };

  schema.statics.getHistory = function(req, callback) {
    this.find({ who: req.user._id})
      .populate('target', '-__v, -salt -token -_id -filledInformation -hashedPassword -email')
      .select('target action created -_id')
      .exec((err, users) => {
        if (err) return callback(err);
        callback(null, { type: "ok", message: "", data: users });
      })
  };
  
  return mongo.model('Actions', schema);
}