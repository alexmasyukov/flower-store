const express = require('express')
const cacheControl = require('express-cache-controller')
const router = express.Router()
const ordersController = require('../controllers/orders')

router.route('/')
   .get(
      cacheControl({ noCache: true }),
      ordersController.getOrderCode
   )

module.exports = router