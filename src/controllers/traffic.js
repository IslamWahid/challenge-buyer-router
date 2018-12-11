var send = require('send-data/json')
var buyerModel = require('../models/buyers')
var trafficService = require('../services/traffic')

var trafficController = {
  route: (req, res, opts, cb) => {
    buyerModel.findAll((err, data) => {
      if (err) return cb(err)
      var buyers = JSON.parse(data)
      var bestLocation = trafficService.getBestLocation(buyers, opts.query)
      send(req, res, {
        body: bestLocation,
        statusCode: 200
      })
    })
  }
}

module.exports = trafficController
