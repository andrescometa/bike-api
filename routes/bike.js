const { Router } = require('express')
const BikeController = require('../controllers/bike')

const router = Router()

router.get('/', BikeController.getBikes)
router.get('/:id?', BikeController.getBike)
router.post('/save-bike', BikeController.saveBike)
router.put('/edit-bike/:id?', BikeController.updateBike)
router.delete('/delete-bike/:id?', BikeController.deleteBike)

module.exports = router