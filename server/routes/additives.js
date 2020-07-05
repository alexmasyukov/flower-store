const express = require('express')
const router = express.Router()
const commonController = require("../controllers/common")
const { Additive } = require('../models/additive')
const {
  validateQuery,
  validateBody,
  validateParams
} = require('../middlewares/jsonSchemaValidator')
const checkAuth = require('../middlewares/checkAuth')


router.route('/')
  .get(
    checkAuth,
    validateQuery(Additive.querySchema),
    commonController.getAll(Additive.table)
  )
  .post(
    checkAuth,
    validateBody(Additive.bodySchema),
    commonController.createOne(Additive.table, ['data'])
  )

router.route('/:id')
  .get(
    checkAuth,
    validateParams(Additive.paramsSchema),
    validateQuery(Additive.querySchema),
    commonController.getOne(Additive.table)
  )
  .put(
    checkAuth,
    validateParams(Additive.paramsSchema),
    validateBody(Additive.updateSchema),
    commonController.updateOne(Additive.table, ['data'])
  )
  .delete(
    checkAuth,
    validateParams(Additive.paramsSchema),
    commonController.deleteOne(Additive.table)
  )

module.exports = router