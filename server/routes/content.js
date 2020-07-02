const express = require('express')
const router = express.Router()
const commonController = require("../controllers/common")
const { Content } = require('../models/content')
const {
  validateQuery,
  validateBody,
  validateParams
} = require('../middlewares/jsonSchemaValidator')


router.route('/')
  .get(
    validateQuery(Content.querySchema),
    commonController.getAll(Content.table)
  )
  .post(
    validateBody(Content.bodySchema),
    commonController.createOne(Content.table)
  )

router.route('/:id')
  .get(
    validateParams(Content.paramsSchema),
    validateQuery(Content.querySchema),
    commonController.getOne(Content.table)
  )
  .put(
    validateParams(Content.paramsSchema),
    validateBody(Content.updateSchema),
    commonController.updateOne(Content.table)
  )
  .delete(
    validateParams(Content.paramsSchema),
    commonController.deleteOne(Content.table)
  )

module.exports = router