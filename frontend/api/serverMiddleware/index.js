require('../models/user');
require('../models/actions');
const mongo = require('../db/mongo');

export default async (req, res, next) => {
  let url = req._parsedUrl.pathname.replace(/^\/+|\/+$|\.+/g, "");
  url = url.split("/");
  let method = url.pop();
  let controller = url.slice(1).join("/");
  let model = controller[0].toUpperCase() + controller.substring(1);

  await mongo.models.User.findOne({ token: req.body.activationCode }, (err, user) => {
    if (err) next(500);
    req.user = user;
  });
  
  await mongo.models[model][method](req, (err, result) => {
    console.log(result);
    res.end(JSON.stringify(result));
  });
};
