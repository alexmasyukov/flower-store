const express = require('express')
const cacheControl = require('express-cache-controller')
const router = express.Router()
const bannersController = require("../controllers/banners")
const { Banner } = require('../models/banner')
const { validateSchema } = require('../middlewares/jsonSchemaValidator')

router.route('/')
  .get(
    cacheControl({ MaxAge: 10 }),
    bannersController.getAll
  )
  .post(
    validateSchema(Banner.jsonSchema),
    bannersController.createOne
  )

router.route('/:id')
  .get(
    cacheControl({ MaxAge: 10 }),
    bannersController.getOne)
  .put(
    validateSchema(Banner.jsonSchema),
    bannersController.updateOne
  )

module.exports = router