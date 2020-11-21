module.exports = async function(options) {

  const User = this
  const docs = await User
    .aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            // coordinates: [ 55.751640, 37.616565 ],
            // coordinates: [ 37.616565, 55.751640 ],
            coordinates: [ 0.2, 0.2 ],
          },
          distanceField: "calculated",
          maxDistance: 25000000,
        }
      },
      {
        $match: {
          login: { $ne: options.login },
          gender: { $in: options.preference },
          filledInformation: true,
          age: { $gt: +options.minAge - 1, $lt: +options.maxAge + 1 },
          fameRaiting: { $gt: +options.minRate - 1, $lt: +options.maxRate + 1 },
        }
      },
    ])
    
    // .select('-_id -salt -token -hashedPassword -__v -email -created')
  // let filteredDocs = docs
  console.log(options)
  console.log(docs[0])


  // if (options.tags.length) {
  //   filteredDocs = filteredDocs.filter(
  //     (user) => options.tags.some((tag) => user.tags.includes(tag))
  //   )
  // }
  // filteredDocs.forEach((user) => {
  //   user.countTags = user.tags.reduce((sum, tag) => {
  //     return sum += +options.tags.includes(tag)
  //   }, 0)
  // })
  // const sortFields = Object.keys(options.sortOrder)
  // const sortLen = sortFields.length
  // let i = 0
  // const compare = function(a, b, i) {
  //   const field = sortFields[i]
  //   return (i === sortLen)
  //     ? 0 : (
  //       options.sortOrder[field] * (a[field] - b[field]) ||
  //       compare(a, b, i + 1)
  //     )
  // }
  // filteredDocs = filteredDocs.sort((a, b) => compare(a, b, 0))
  // let res = {
  //   users: filteredDocs.slice(options.skip, options.skip + options.limit),
  //   length: filteredDocs.length,
  // }
  return { type: "ok", data: docs }
}