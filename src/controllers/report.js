var JSONStream = require('JSONStream')
var reportService = require('../services/report')

module.exports = {
  get: (req, res, opts, cb) => {
    reportService.generateReport(opts.query, (err, cursor) => {
      if (err) return cb(err)
      cursor.pipe(JSONStream.stringify()).pipe(res)
    })
  }
}
