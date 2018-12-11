var HttpHashRouter = require('http-hash-router')
var buyerController = require('../controllers/buyer')
var trafficController = require('../controllers/traffic')

var router = HttpHashRouter()

router.set('/buyers', { POST: buyerController.post })
router.set('/buyers/:id', { GET: buyerController.get })
router.set('/route', { GET: trafficController.route })

module.exports = router
