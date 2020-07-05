const express = require('express')
const router = express.Router()
const commonController = require("../controllers/common")
const { ProductSize } = require('../models/productSize')
const {
  validateQuery,
  validateBody,
  validateParams
} = require('../middlewares/jsonSchemaValidator')
const checkAuth = require('../middlewares/checkAuth')

router.route('/:id')
  .get(
    checkAuth,
    validateParams(ProductSize.paramsSchema),
    validateQuery(ProductSize.querySchema),
    commonController.getOne(ProductSize.table)
  )
  .put(
    checkAuth,
    validateParams(ProductSize.paramsSchema),
    validateBody(ProductSize.updateSchema),
    commonController.updateOne(ProductSize.table)
  )

module.exports = router