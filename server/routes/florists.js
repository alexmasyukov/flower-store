const express = require('express')
const router = express.Router()
const floristsController = require('../controllers/florists')

router.route('/')
   .get(floristsController.getAll)

router.route('/:id')
   .get(floristsController.getOne)

module.exports = router