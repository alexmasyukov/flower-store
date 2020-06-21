const express = require('express')
const router = express.Router()
const smsController = require('../controllers/sms')
const { SmsModel } = require('../models/sms')
const { validateSchema } = require('../middlewares/jsonSchemaValidator')

// router.route('/send')
//   .post(
//     validateSchema(SmsModel.jsonSchema),
//     smsController.getSmsConfig,
//     smsController.send
//   )

router.route('/balance')
  .get(
    smsController.getSmsConfig('getUserBalance'),
    smsController.getBalance
  )

module.exports = router