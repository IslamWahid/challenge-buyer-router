var redisClient = require('../redis')
module.exports = { save, intersect }

function save (criteriaArr, cb) {
  var redisMulti = redisClient.multi()
  criteriaArr.forEach(criteriaSet => {
    redisMulti.zadd(criteriaSet)
  })
  redisMulti.exec(cb)
}

function intersect (interSets, cb) {
  var redisMulti = redisClient.multi()
  redisMulti.zinterstore(['temp', interSets.length, ...interSets])
  redisMulti.zrevrange(['temp', 0, -1])
  redisMulti.exec(cb)
}
