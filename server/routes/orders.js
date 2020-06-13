const express = require('express')
const cacheControl = require('express-cache-controller')
const router = express.Router()
const commonController = require("../controllers/common")
const ordersController = require('../controllers/orders')
const { OrderModel } = require('../models/order')
const { validateSchema } = require('../middlewares/jsonSchemaValidator')

router.route('/')
  .get(
    cacheControl({ MaxAge: 10 }),
    commonController.getAll(OrderModel.table, 'id', 'desc', {})
  )
  .post(
    validateSchema(OrderModel.jsonSchema),
    commonController.createOne(OrderModel.table)
  )


router.route('/confirmation')
  .get(
    cacheControl({ noCache: true }),
    ordersController.confirmation
  )

router.route('/notify')
  .get(ordersController.nofity)


router.route('/:id')
  .get(
    cacheControl({ MaxAge: 10 }),
    commonController.getOne(OrderModel.table, {})
  )
  .put(
    validateSchema(OrderModel.jsonSchema),
    commonController.updateOne(OrderModel.table)
  )


module.exports = router