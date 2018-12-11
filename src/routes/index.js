var HttpHashRouter = require('http-hash-router')
var buyerController = require('../controllers/buyer')

var router = HttpHashRouter()

router.set('/buyers', { POST: buyerController.post })

module.exports = router
