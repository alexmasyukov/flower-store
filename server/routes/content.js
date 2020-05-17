const express = require('express')
const cacheControl = require('express-cache-controller')
const router = express.Router()
const contentController = require("../controllers/content")

router.route('/')
  .get(
    cacheControl({ sMaxAge: 10 }),
    contentController.getAll)

router.route('/:id')
  .get(
    cacheControl({ sMaxAge: 10 }),
    contentController.getOne)

module.exports = router