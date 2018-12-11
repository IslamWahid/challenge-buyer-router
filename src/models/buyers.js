var redisClient = require('../redis')
var HASH_NAME = 'buyers'

var buyerModel = {
  create: (document, cb) => {
    redisClient.hmset(HASH_NAME, [document.id, JSON.stringify(document)], cb)
  },

  findOne: (id, cb) => {
    redisClient.hget(HASH_NAME, id, cb)
  },

  findAll: cb => {
    redisClient.hgetall(HASH_NAME, cb)
  }
}

module.exports = buyerModel
