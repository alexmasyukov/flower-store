const express = require('express')
const router = express.Router()
const commonController = require("../controllers/common")
const { Review } = require('../models/review')
const {
  validateQuery,
  validateBody,
  validateParams
} = require('../middlewares/jsonSchemaValidator')

router.route('/')
  .get(
    validateQuery(Review.querySchema),
    commonController.getAll(Review.table, 'created_at', 'desc')
  )
  .post(
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
    validateParams(Review.paramsSchema),
    validateBody(Review.updateSchema),
    commonController.updateOne(Review.table)
  )
  .delete(
    validateParams(Review.paramsSchema),
    commonController.deleteOne(Review.table)
  )

module.exports = router