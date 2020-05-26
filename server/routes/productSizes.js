const express = require('express')
const cacheControl = require('express-cache-controller')
const router = express.Router()
const productSizesController = require('../controllers/productSizes')

router.route('/:id/:field')
  .put(
    cacheControl({ maxAge: 0 }),
    productSizesController.updateProductSizeField
  )

module.exports = router