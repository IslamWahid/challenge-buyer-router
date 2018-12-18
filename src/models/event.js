var events = require('../mongo')
  .getDb()
  .collection('events')

module.exports = { create, aggregate }

function create (document, cb) {
  events.insertOne(document, cb)
}

function aggregate (aggregation, cb) {
  events.aggregate(aggregation, cb)
}
