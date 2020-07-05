const express = require('express')
const router = express.Router()
const commonController = require("../controllers/common")
const { Review } = require('../models/review')
const {
  validateQuery,
  validateBody,
  validateParams
} = require('../middlewares/jsonSchemaValidator')
const checkAuth = require('../middlewares/checkAuth')


router.route('/')
  .get(
    validateQuery(Review.querySchema),
    commonController.getAll(Review.table, 'created_at', 'desc')
  )
  .post(
    checkAuth,
    validateBody(Review.bodySchema),
    commonController.createOne(Review.table)
  )

router.route('/:id')
  .get(
    validateParams(Review.paramsSchema),
    validateQuery(Review.querySchema),
    commonController.getOne(Review.table)
  )
  .put(
    checkAuth,
    validateParams(Review.paramsSchema),
    validateBody(Review.updateSchema),
    commonController.updateOne(Review.table)
  )
  .delete(
    checkAuth,
    validateParams(Review.paramsSchema),
    commonController.deleteOne(Review.table)
  )

module.exports = router