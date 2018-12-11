var HttpHashRouter = require('http-hash-router')
var buyerController = require('../controllers/buyer')

var router = HttpHashRouter()

router.set('/buyers', { POST: buyerController.post })
router.set('/buyers/:id', { GET: buyerController.get })
router.set('/routes', { GET: buyerController.get })

module.exports = router
