const express = require('express')
const router = express.Router()
const commonController = require("../controllers/common")
const { ProductSize } = require('../models/productSize')
const {
  validateQuery,
  validateBody,
  validateParams
} = require('../middlewares/jsonSchemaValidator')

router.route('/:id')
  .get(
    validateParams(ProductSize.paramsSchema),
    validateQuery(ProductSize.querySchema),
    commonController.getOne(ProductSize.table)
  )
  .put(
    validateParams(ProductSize.paramsSchema),
    validateBody(ProductSize.updateSchema),
    commonController.updateOne(ProductSize.table)
  )

module.exports = router