const express = require('express')
const router = express.Router()
const commonController = require("../controllers/common")
const { City } = require('../models/city')
const {
  validateQuery,
  validateParams
} = require('../middlewares/jsonSchemaValidator')

router.route('/')
  .get(
    validateQuery(City.querySchema),
    commonController.getAll(City.table)
  )


router.route('/:id')
  .get(
    validateParams(City.paramsSchema),
    validateQuery(City.querySchema),
    commonController.getOne(City.table)
  )

module.exports = router