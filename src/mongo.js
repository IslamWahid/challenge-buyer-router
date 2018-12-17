var MongoClient = require('mongodb').MongoClient

var _con
var url = process.env.MONGO_URL || 'mongodb://localhost:37017'
var dbName = process.env.MONGO_DB || 'ads-db'

module.exports = {
  connect: function (cb) {
    MongoClient.connect(
      `${url}/${dbName}`,
      { useNewUrlParser: true },
      function (err, con) {
        if (!err) {
          console.log('mongoDb connected successfully')
          _con = con
        }
        return cb(err)
      }
    )
  },

  getDb: function () {
    return _con && _con.db()
  }
}
