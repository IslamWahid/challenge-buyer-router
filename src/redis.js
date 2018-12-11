var redis =
  process.env.NODE_ENV === 'test' ? require('fakeredis') : require('redis')

var host = process.env.REDIS_HOST || '127.0.0.1'
var port = process.env.REDIS_PORT || '6379'

var client = redis.createClient(port, host)

client.on('connect', function () {
  console.log('Redis client connected')
})

client.on('error', function (err) {
  console.log('Redis Error ' + err)
})

module.exports = client
