const express = require('express')
const cacheControl = require('express-cache-controller')
const router = express.Router()
const productSizesController = require('../controllers/productSizes')

router.route('/:id/:prop')
  .put(
    cacheControl({ maxAge: 0 }),
    productSizesController.updateProductSizeProp
  )

module.exports = router