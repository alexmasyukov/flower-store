const express = require('express')
const cacheControl = require('express-cache-controller')
const router = express.Router()
const commonController = require("../controllers/common")
const customersController = require("../controllers/customers")
const { Customer } = require('../models/customer')
const { validateSchema } = require('../middlewares/jsonSchemaValidator')

router.route('/')
  .get(
    cacheControl({ MaxAge: 10 }),
    commonController.getAll('customers', 'id', 'desc', {})
  )
  .post(
    validateSchema(Customer.jsonSchema),
    commonController.createOne('customers')
  )

router.route('/confim')
  .get(
    validateSchema(Customer.confimJsonSchema),
    customersController.confim
  )

router.route('/:id')
  .get(
    cacheControl({ MaxAge: 10 }),
    commonController.getOne('customers', {})
  )
  .put(
    validateSchema(Customer.jsonSchema),
    commonController.updateOne('customers')
  )
  // .delete(commonController.deleteOne('customers'))

module.exports = router