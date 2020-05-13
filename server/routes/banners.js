const express = require('express')
const cacheControl = require('express-cache-controller')
const router = express.Router()
const bannersController = require("../controllers/banners")

router.route('/')
  .get(
    cacheControl({ MaxAge: 10 }),
    bannersController.getAll)

router.route('/:id')
  .get(
    cacheControl({ MaxAge: 10 }),
    bannersController.getOne)

module.exports = router