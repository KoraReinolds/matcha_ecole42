module.exports = async function(body) {
  
  const User = this
  const user = await User.findOne({ login: body.login })

  if (user) {
    return { type: "error", message: "Пользователь с таким логином уже существует" }
  }
  console.log({
    type: "Point",
    coordinates: [body.location.x, body.location.y],
  })
  const newUser = new User({
    ...body,
    geoLoc: {
      type: "Point",
      coordinates: [body.location.x, body.location.y],
    },
    isFilled: false,
    age: null,
    rating: 0,
    gender: '',
    preferences: [],
    biography: '',
    tags: [],
    images: [],
  })
  await newUser.save()
  return { type: "ok" }
    
}