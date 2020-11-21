module.exports = async function(req) {

  const User = this
  const login = req.body.login || req.user.login

  const user = await User.findOne({ login })
    .select('-_id -login -realLocation -salt -token -hashedPassword -__v -created')

  if (!user) {
    return { type: "error", message: "User not found" }
  }
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
