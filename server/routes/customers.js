const express = require('express')
// const cacheControl = require('express-cache-controller')
const router = express.Router()
const commonController = require("../controllers/common")
const customersController = require("../controllers/customers")
const smsController = require('../controllers/sms')
const { Customer } = require('../models/customer')
const {
  validateQuery,
  validateBody,
  validateParams
} = require('../middlewares/jsonSchemaValidator')


router.route('/')
  .get(
    validateQuery(Customer.querySchema),
    commonController.getAll(Customer.table, 'id', 'desc', {})
  )
  .post(
    validateBody(Customer.bodySchema),
    commonController.createOne(Customer.table, ['extra'])
  )

router.route('/:id')
  .get(
    validateParams(Customer.paramsSchema),
    validateQuery(Customer.querySchema),
    commonController.getOne(Customer.table, {})
  )
  .put(
    validateParams(Customer.paramsSchema),
    validateBody(Customer.updateSchema),
    commonController.updateOne(Customer.table, ['extra'])
  )
  .delete(
    validateParams(Customer.paramsSchema),
    commonController.deleteOne(Customer.table)
  )


router.route('/confim')
  .post(
    validateBody(Customer.confimJsonSchema),
    // smsController.getSmsConfig('sendSMS'),
    customersController.confim
  )

module.exports = router