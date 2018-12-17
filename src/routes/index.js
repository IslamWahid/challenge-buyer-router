var HttpHashRouter = require('http-hash-router')
var buyerController = require('../controllers/buyer')
var trafficController = require('../controllers/traffic')
var eventController = require('../controllers/event')
var reportController = require('../controllers/report')

var router = HttpHashRouter()

router.set('/buyers', { POST: buyerController.post })
router.set('/buyers/:id', { GET: buyerController.get })
router.set('/route', { GET: trafficController.route })
router.set('/events', { POST: eventController.post })
router.set('/report', { GET: reportController.get })

module.exports = router
