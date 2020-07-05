const express = require('express')
const router = express.Router()
const commonController = require("../controllers/common")
const { TeamPerson } = require('../models/teamPerson')
const {
  validateQuery,
  validateBody,
  validateParams
} = require('../middlewares/jsonSchemaValidator')
const checkAuth = require('../middlewares/checkAuth')


router.route('/')
  .get(
    validateQuery(TeamPerson.querySchema),
    commonController.getAll(TeamPerson.table)
  )
  .post(
    checkAuth,
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
    checkAuth,
    validateParams(TeamPerson.paramsSchema),
    validateBody(TeamPerson.updateSchema),
    commonController.updateOne(TeamPerson.table)
  )
  .delete(
    checkAuth,
    validateParams(TeamPerson.paramsSchema),
    commonController.deleteOne(TeamPerson.table)
  )

module.exports = router