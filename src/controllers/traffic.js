var send = require('send-data/json')
var buyerModel = require('../models/buyers')
var trafficService = require('../services/traffic')

var trafficController = {
  route: (req, res, opts, cb) => {
    buyerModel.findAll((err, buyers) => {
      if (err) return cb(err)
      var bestLocation = trafficService.getBestLocation(buyers, opts.query)
      send(req, res, {
        headers: { location: bestLocation },
        statusCode: 302
      })
    })
  }
}

module.exports = trafficController
