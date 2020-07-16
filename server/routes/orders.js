const express = require('express')
// const cacheControl = require('express-cache-controller')
const router = express.Router()
const commonController = require("../controllers/common")
const ordersController = require('../controllers/orders')
const viberBotController = require('../controllers/botViber')
const { Order } = require('../models/order')
const { Customer } = require('../models/customer')
const {
  validateQuery,
  validateBody,
  validateParams
} = require('../middlewares/jsonSchemaValidator')
const checkAuth = require('../middlewares/checkAuth')

// cacheControl({ noCache: true }),

router.route('/')
  .get(
    checkAuth,
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
    checkAuth,
    validateParams(Order.paramsSchema),
    validateQuery(Order.querySchema),
    commonController.getOne(Order.table, {}, 'result_order'),
    (req, res, next) => {
      const { customer_id } = res.result_order
      // Указываем id для покупателя
      req.query = {
        id: customer_id
      }
      // Очищаем параметры, чтобы правильно стработала следующая middleware
      //  (удаляем id, переданный в ссылке)
      req.params = {}
      next()
    },
    commonController.getOne(Customer.table, {}, 'result_customer'),
    (req, res, next) => {
      // Совмещаем ответы и отдаем пользователю
      const { phone, name, points } = res.result_customer
      res.json({
        ...res.result_order,
        customer: {
          phone,
          name,
          points
        }
      })
    }
  )
  .put(
    // checkAuth,
    validateParams(Order.paramsSchema),
    validateBody(Order.updateSchema),
    commonController.updateOne(Order.table)
  )
  .delete(
    checkAuth,
    validateParams(Order.paramsSchema),
    commonController.deleteOne(Order.table)
  )


module.exports = router