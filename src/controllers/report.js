var send = require('send-data/json')
var statusCodes = require('../const/statusCode.json')
var reportService = require('../services/report')

module.exports = {
  get: (req, res, opts, cb) => {
    reportService.generateReport(opts.query, (err, cursor) => {
      if (err) return cb(err)
      cursor.toArray((err, docs) => {
        if (err) return cb(err)
        send(req, res, {
          body: docs,
          statusCode: statusCodes['Success']
        })
      })
    })
  }
}
