var send = require('send-data')
var buyerModel = require('../models/buyers')
var trafficService = require('../services/traffic')
var statusCodes = require('../const/statusCode.json')

module.exports = {
  route: (req, res, opts, cb) => {
    buyerModel.findAll((err, buyers) => {
      if (err) return cb(err)
      var bestLocation = trafficService.getBestLocation(buyers, opts.query)
      send(req, res, {
        headers: { location: bestLocation },
        statusCode: statusCodes['Found']
      })
    })
  }
}
