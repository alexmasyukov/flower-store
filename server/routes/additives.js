const express = require('express')
// const cacheControl = require('express-cache-controller')
const router = express.Router()
const commonController = require("../controllers/common")
const { Additive } = require('../models/additive')
const {
  validateQuery,
  validateBody,
  validateParams
} = require('../middlewares/jsonSchemaValidator')

// cacheControl({ MaxAge: 10 }),

router.route('/')
  .get(
    validateQuery(Additive.querySchema),
    commonController.getAll(Additive.table)
  )
  .post(
    validateBody(Additive.bodySchema),
    commonController.createOne(Additive.table, ['data'])
  )

router.route('/:id')
  .get(
    validateParams(Additive.paramsSchema),
    validateQuery(Additive.querySchema),
    commonController.getOne(Additive.table)
  )
  .put(
    validateParams(Additive.paramsSchema),
    validateBody(Additive.bodySchema),
    commonController.updateOne(Additive.table, ['data'])
  )
  .delete(
    validateParams(Additive.paramsSchema),
    commonController.deleteOne(Additive.table)
  )

module.exports = router