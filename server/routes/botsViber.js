const express = require('express')
const router = express.Router()
const commonController = require("../controllers/common")
const botViberController = require("../controllers/botViber")
const { BotViber } = require('../models/botViber')
const { validateSchema } = require('../middlewares/jsonSchemaValidator')

const table = BotViber.table

router.route('/test')
  .get(botViberController.test)

router.route('/:id')
  .get(commonController.getOne(table, {}))
  .put(
    validateSchema(BotViber.jsonSchema),
    commonController.updateOne(table, ['notify_subscribers'])
  )


module.exports = router