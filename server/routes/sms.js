const express = require('express')
const router = express.Router()
const smsController = require('../controllers/sms')

router.route('/balance')
  .get(
    smsController.getBalance
  )

module.exports = router