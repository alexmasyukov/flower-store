const express = require('express')
// const cacheControl = require('express-cache-controller')
const router = express.Router()
const commonController = require("../controllers/common")
const { Banner } = require('../models/banner')
const {
  validateQuery,
  validateBody,
  validateParams
} = require('../middlewares/jsonSchemaValidator')

// cacheControl({ MaxAge: 10 }),

router.route('/')
  .get(
    validateQuery(Banner.querySchema),
    commonController.getAll(Banner.table)
  )
  .post(
    validateBody(Banner.bodySchema),
    commonController.createOne(Banner.table)
  )

router.route('/:id')
  .get(
    validateParams(Banner.paramsSchema),
    validateQuery(Banner.querySchema),
    commonController.getOne(Banner.table)
  )
  .put(
    validateParams(Banner.paramsSchema),
    validateBody(Banner.updateSchema),
    commonController.updateOne(Banner.table)
  )
  .delete(
    validateParams(Banner.paramsSchema),
    commonController.deleteOne(Banner.table)
  )

module.exports = router