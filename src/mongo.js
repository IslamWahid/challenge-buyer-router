var { MongoClient } = require('mongodb')

var url = process.env.MONGO_URL || 'mongodb://localhost:37017'
var dbName = process.env.MONGO_DB || 'ads-db'
var _db

module.exports = {
  connect: function (cb) {
    MongoClient.connect(
      `${url}/${dbName}`,
      { useNewUrlParser: true },
      function (err, con) {
        if (err) return cb(err)
        console.log('mongoDb connected successfully')
        _db = con.db()
        _db
          .collection('events')
          .createIndexes(
            [
              { name: 'type', key: { type: 1 } },
              { name: 'zoneId', key: { zoneId: 1 } },
              { name: 'date', key: { date: 1 } }
            ],
            function (err) {
              if (err) return cb(err)
              return cb(err)
            }
          )
      }
    )
  },

  getDb: function () {
    return _db
  }
}
