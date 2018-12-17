process.env.NODE_ENV = 'test'
process.env.MONGO_URL = 'mongodb://192.168.99.100:37017'
process.env.MONGO_DB = 'ads-db-test'

var tape = require('tape')
var map = require('map-limit')
var servertest = require('dg-servertest')
var querystring = require('querystring')

var buyers = require('./buyers.json')
var events = require('./events.json')
var getServer = require('../lib/server')
getServer((err, server) => {
  if (err) return console.error(err)
  var db = require('../src/mongo').getDb()

  tape('should add buyers', function (t) {
    map(buyers, 1, addBuyer, function (err) {
      t.ifError(err, 'should not error')
      t.end()
    })

    function addBuyer (buyer, cb) {
      var opts = { encoding: 'json', method: 'POST' }
      var stream = servertest(server, '/buyers', opts, function (err, res) {
        t.equal(res.statusCode, 201, 'correct statusCode')
        cb(err)
      })

      stream.end(JSON.stringify(buyer))
    }
  })

  tape('should not add invalid buyer', function (t) {
    var opts = { encoding: 'json', method: 'POST' }
    var stream = servertest(server, '/buyers', opts, function (err, res) {
      t.ifError(err, 'should not error')
      t.ok(res.statusCode >= 400, 'error statusCode')
      t.end()
    })

    stream.end("{'invalid': json")
  })

  tape('should get buyers', function (t) {
    map(buyers, 1, getBuyer, function (err) {
      t.ifError(err, 'should not error')
      t.end()
    })

    function getBuyer (buyer, cb) {
      var opts = { encoding: 'json' }
      servertest(server, '/buyers/' + buyer.id, opts, function (err, res) {
        if (err) return cb(err)
        t.equal(res.statusCode, 200, 'correct statusCode')
        t.deepEqual(res.body, buyer, 'buyer should match')
        cb()
      })
    }
  })

  tape('should route traffic', function (t) {
    var requests = [
      { timestamp: '2017-03-12T10:30:00.000Z', state: 'NV', device: 'mobile' },
      { timestamp: '2017-03-12T01:30:00.000Z', state: 'CA', device: 'desktop' },
      { timestamp: '2017-03-12T03:30:00.000Z', state: 'CA', device: 'desktop' }
    ]

    var expected = ['http://0.b.com', 'http://0.c.com', 'http://1.a.com']

    map(requests, 1, routeTraffic, function (err, routes) {
      t.ifError(err, 'should not error')
      t.deepEqual(routes, expected, 'routes should match')
      t.end()
    })

    function routeTraffic (request, cb) {
      var url = '/route?' + querystring.stringify(request)
      servertest(server, url, function (err, res) {
        if (err) return cb(err)
        t.equal(res.statusCode, 302, 'correct statusCode')
        cb(null, res.headers.location)
      })
    }
  })

  db.dropDatabase(() => {
    tape('should add events', function (t) {
      map(events, 1, addEvent, function (err) {
        t.ifError(err, 'should not error')
        t.end()
      })

      function addEvent (event, cb) {
        var opts = { encoding: 'json', method: 'POST' }
        var stream = servertest(server, '/events', opts, function (err, res) {
          t.equal(res.statusCode, 201, 'correct statusCode')
          cb(err)
        })

        stream.end(JSON.stringify(event))
      }
    })
  })
})
