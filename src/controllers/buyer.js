var body = require('body/json')
var send = require('send-data/json')

var buyerController = {
  post: (req, res, opts, cb) => {
    body(req, res, function (err, data) {
      if (err) return cb(err)
      console.log(data)
      // send(req, res, {
      //   body: {
      //     foo: 'bar'
      //   },
      //   statusCode: 201
      // })
    })
  }
}

module.exports = buyerController
