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
const checkAuth = require('../middlewares/checkAuth')


router.route('/')
  .get(
    checkAuth,
    validateQuery(Customer.querySchema),
    commonController.getAll(Customer.table, 'id', 'desc', {})
  )
  .post(
    checkAuth,
    validateBody(Customer.bodySchema),
    commonController.createOne(Customer.table, ['extra'])
  )

router.route('/:id')
  .get(
    checkAuth,
    validateParams(Customer.paramsSchema),
    validateQuery(Customer.querySchema),
    commonController.getOne(Customer.table, {})
  )
  .put(
    checkAuth,
    validateParams(Customer.paramsSchema),
    validateBody(Customer.updateSchema),
    commonController.updateOne(Customer.table, ['extra'])
  )
  .delete(
    checkAuth,
    validateParams(Customer.paramsSchema),
    commonController.deleteOne(Customer.table)
  )


router.route('/confim')
  .post(
    validateBody(Customer.confimJsonSchema),
    customersController.confim
  )

module.exports = router