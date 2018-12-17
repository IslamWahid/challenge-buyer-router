var mongoDb = require('../mongo').getDb()

module.exports = { create, aggregate }

function create (document, cb) {
  mongoDb.collection('events').insertOne(document, cb)
}

function aggregate (aggregation, cb) {
  mongoDb.collection('events').aggregate(aggregation, cb)
}
