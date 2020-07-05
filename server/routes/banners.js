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
const checkAuth = require('../middlewares/checkAuth')

// cacheControl({ MaxAge: 10 }),

router.route('/')
  .get(
    checkAuth,
    validateQuery(Banner.querySchema),
    commonController.getAll(Banner.table)
  )
  .post(
    checkAuth,
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
    checkAuth,
    validateParams(Banner.paramsSchema),
    validateBody(Banner.updateSchema),
    commonController.updateOne(Banner.table)
  )
  .delete(
    checkAuth,
    validateParams(Banner.paramsSchema),
    commonController.deleteOne(Banner.table)
  )

module.exports = router