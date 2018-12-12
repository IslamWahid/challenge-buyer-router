var body = require('body/json')
var send = require('send-data/json')
var buyerModel = require('../models/buyers')
var trafficService = require('../services/traffic')
var statusCodes = require('../const/statusCode.json')

module.exports = {
  post: (req, res, opts, cb) => {
    body(req, res, function (err, reqBody) {
      if (err) return cb(err)

      buyerModel.create(reqBody, err => {
        if (err) return cb(err)

        trafficService.saveCriteria(reqBody.offers, err => {
          if (err) return cb(err)
          send(req, res, {
            body: '',
            statusCode: statusCodes['Created']
          })
        })
      })
    })
  },

  get: (req, res, opts, cb) => {
    buyerModel.findOne(opts.params.id, (err, data) => {
      if (err) return cb(err)

      send(req, res, {
        body: JSON.parse(data),
        statusCode: statusCodes['OK']
      })
    })
  }
}
