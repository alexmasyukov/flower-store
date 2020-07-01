const express = require('express')
const router = express.Router()
const commonController = require("../controllers/common")
const { TeamPerson } = require('../models/teamPerson')
const {
  validateQuery,
  validateBody,
  validateParams
} = require('../middlewares/jsonSchemaValidator')


router.route('/')
  .get(
    validateQuery(TeamPerson.querySchema),
    commonController.getAll(TeamPerson.table)
  )
  .post(
    validateBody(TeamPerson.bodySchema),
    commonController.createOne(TeamPerson.table)
  )

router.route('/:id')
  .get(
    validateParams(TeamPerson.paramsSchema),
    validateQuery(TeamPerson.querySchema),
    commonController.getOne(TeamPerson.table)
  )
  .put(
    validateParams(TeamPerson.paramsSchema),
    validateBody(TeamPerson.updateSchema),
    commonController.updateOne(TeamPerson.table)
  )
  .delete(
    validateParams(TeamPerson.paramsSchema),
    commonController.deleteOne(TeamPerson.table)
  )

module.exports = router