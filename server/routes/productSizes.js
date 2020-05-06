const express = require('express')
const cacheControl = require('express-cache-controller')
const router = express.Router()
const productSizesController = require('../controllers/productSizes')

router.route('/:id/public')
  .put(
    cacheControl({ maxAge: 5 }),
    productSizesController.putProductSizePublic
  )

module.exports = router