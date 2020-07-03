const express = require('express')
// const cacheControl = require('express-cache-controller')
const router = express.Router()
const commonController = require("../controllers/common")
const ordersController = require('../controllers/orders')
const viberBotController = require('../controllers/botViber')
const { Order } = require('../models/order')
const {
  validateQuery,
  validateBody,
  validateParams
} = require('../middlewares/jsonSchemaValidator')

// cacheControl({ noCache: true }),

router.route('/')
  .get(
    validateQuery(Order.querySchema),
    commonController.getAll(Order.table, 'id', 'desc', {})
  )
  .post(
    validateBody(Order.bodySchema),
    commonController.createOne(Order.table, ['products', 'steps'], true),
    ordersController.orderToMessage,
    viberBotController.sendMessage
  )


router.route('/:id')
  .get(
    validateParams(Order.paramsSchema),
    validateQuery(Order.querySchema),
    // todo: Сделать дополнительный middleware на добавление customer
    //  к основному запросу по id order
    commonController.getOne(Order.table,{})
  )
  .put(
    validateParams(Order.paramsSchema),
    validateBody(Order.updateSchema),
    commonController.updateOne(Order.table)
  )
  .delete(
    validateParams(Order.paramsSchema),
    commonController.deleteOne(Order.table)
  )


router.route('/confirmation')
  .get(
    ordersController.confirmation
  )

// router.route('/notify')
//   .get(ordersController.nofity)

module.exports = router