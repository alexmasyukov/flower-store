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
const checkAuth = require('../middlewares/checkAuth')

router.route('/test')
  .post(
    // checkAuth,
    botViberController.test
  )

router.route('/send')
  .post(
    botViberController.sendMessage
  )

router.route('/:id')
  .get(
    checkAuth,
    validateParams(BotViber.paramsSchema),
    validateQuery(BotViber.querySchema),
    commonController.getOne(BotViber.table, {})
  )
  .put(
    checkAuth,
    validateParams(BotViber.paramsSchema),
    validateBody(BotViber.updateSchema),
    commonController.updateOne(BotViber.table, ['notify_subscribers'])
  )


module.exports = router