var redisClient = require('../redis')
var HASH_NAME = 'buyers'
module.exports = { create, findOne, findAll }

function create (document, cb) {
  redisClient.hmset(HASH_NAME, [document.id, JSON.stringify(document)], cb)
}

function findOne (id, cb) {
  redisClient.hget(HASH_NAME, id, cb)
}

function findAll (cb) {
  redisClient.hgetall(HASH_NAME, cb)
}
