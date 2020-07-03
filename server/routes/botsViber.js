const express = require('express')
const router = express.Router()
const commonController = require("../controllers/common")
const botViberController = require("../controllers/botViber")
const { BotViber } = require('../models/botViber')
const {
  validateQuery,
  validateBody,
  validateParams
} = require('../middlewares/jsonSchemaValidator')

router.route('/test')
  .get(botViberController.test)

router.route('/send')
  .post(botViberController.sendMessage)

router.route('/:id')
  .get(
    validateParams(BotViber.paramsSchema),
    validateQuery(BotViber.querySchema),
    commonController.getOne(BotViber.table, {})
  )
  .put(
    validateParams(BotViber.paramsSchema),
    validateBody(BotViber.updateSchema),
    commonController.updateOne(BotViber.table, ['notify_subscribers'])
  )


module.exports = router