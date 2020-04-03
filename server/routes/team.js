const express = require('express')
const router = express.Router()
const teamController = require("../controllers/team")

router.route('/')
   .get(teamController.getAll)

router.route('/:id')
   .get(teamController.getOne)

module.exports = router