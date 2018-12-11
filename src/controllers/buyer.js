var send = require('send-data/json')

var buyerController = {
  post: (req, res, opts, cb) => {
    send('done')
  }
}

module.exports = buyerController
