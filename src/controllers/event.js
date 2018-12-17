var body = require('body/json')
var send = require('send-data/json')
var statusCodes = require('../const/statusCode.json')
var eventModel = require('../models/event')

module.exports = {
  post: (req, res, opts, cb) => {
    body(req, res, function (err, reqBody) {
      if (err) return cb(err)
      eventModel.create(reqBody, (err, data) => {
        if (err) cb(err)
        send(req, res, {
          body: '',
          statusCode: statusCodes['Created']
        })
      })
    })
  }
}
