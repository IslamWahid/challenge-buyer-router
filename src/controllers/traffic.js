var send = require('send-data')
var trafficService = require('../services/traffic')
var statusCodes = require('../const/statusCode.json')

module.exports = {
  route: (req, res, opts, cb) => {
    trafficService.getBestLocation(opts.query, (err, results) => {
      if (err) return cb(err)

      send(req, res, {
        headers: { location: results[1] },
        statusCode: statusCodes['Found']
      })
    })
  }
}
