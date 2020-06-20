const express = require('express')
const cacheControl = require('express-cache-controller')
const router = express.Router()
const commonController = require("../controllers/common")
const ordersController = require('../controllers/orders')
const viberBotController = require('../controllers/botViber')
const { OrderModel, OrderCompleteModel } = require('../models/order')
const { validateSchema } = require('../middlewares/jsonSchemaValidator')

router.route('/')
  .get(
    cacheControl({ MaxAge: 10 }),
    commonController.getAll(OrderModel.table, 'id', 'desc', {})
  )
  .post(
    validateSchema(OrderModel.jsonSchema),
    commonController.createOne(OrderModel.table, ['products'], true),
    ordersController.orderToMessage,
    viberBotController.sendMessage
  )


router.route('/confirmation')
  .get(
    cacheControl({ noCache: true }),
    ordersController.confirmation
  )

// router.route('/notify')
//   .get(ordersController.nofity)


router.route('/complete')
  .put(
    validateSchema(OrderCompleteModel.jsonSchema),
    ordersController.updateComplete
  )


router.route('/:id')
  .get(
    cacheControl({ MaxAge: 10 }),
    ordersController.getOne
  )
  .put(
    validateSchema(OrderModel.jsonSchema),
    commonController.updateOne(OrderModel.table)
  )

module.exports = router