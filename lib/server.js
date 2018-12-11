var URL = require('url')
var http = require('http')
var cuid = require('cuid')
var sendJson = require('send-data/json')
var ReqLogger = require('req-logger')

var version = require('../package.json').version
var router = require('../src/routes')

var logger = ReqLogger({ version: version })

module.exports = function createServer () {
  return http.createServer(handler)
}

function handler (req, res) {
  req.id = cuid()
  logger(req, res, { requestId: req.id }, function (info) {
    info.authEmail = (req.auth || {}).email
    console.log(info)
  })
  router(req, res, { query: getQuery(req.url) }, onError.bind(null, req, res))
}

function onError (req, res, err) {
  if (!err) return

  res.statusCode = err.statusCode || 500
  logError(req, res, err)

  sendJson(req, res, {
    error: err.message || http.STATUS_CODES[res.statusCode]
  })
}

function logError (req, res, err) {
  if (process.env.NODE_ENV === 'test') return

  var logType = res.statusCode >= 500 ? 'error' : 'warn'

  console[logType](
    {
      err: err,
      requestId: req.id,
      statusCode: res.statusCode
    },
    err.message
  )
}

function getQuery (url) {
  return URL.parse(url, true).query
}
