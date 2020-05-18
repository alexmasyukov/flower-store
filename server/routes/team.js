const express = require('express')
const router = express.Router()
const teamController = require("../controllers/team")
const { TeamPerson } = require('../models/teamPerson')
const { validateSchema } = require('../middlewares/jsonSchemaValidator')


router.route('/')
  .get(teamController.getAll)
  .post(
    validateSchema(TeamPerson.jsonSchema),
    teamController.createOne
  )

router.route('/:id')
  .get(teamController.getOne)
  .put(
    validateSchema(TeamPerson.jsonSchema),
    teamController.updateOne
  )
  .delete(teamController.deleteOne)

module.exports = router