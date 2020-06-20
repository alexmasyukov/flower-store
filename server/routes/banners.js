const express = require('express')
const cacheControl = require('express-cache-controller')
const router = express.Router()
const bannersController = require("../controllers/banners")
const commonController = require("../controllers/common")
const { Banner } = require('../models/banner')
const { validateSchema } = require('../middlewares/jsonSchemaValidator')

router.route('/')
  .get(
    cacheControl({ MaxAge: 10 }),
    bannersController.getAll
  )
  .post(
    validateSchema(Banner.jsonSchema),
    commonController.createOne('banners')
  )

router.route('/:id')
  .get(
    cacheControl({ MaxAge: 10 }),
    bannersController.getOne)
  .put(
    validateSchema(Banner.jsonSchema),
    commonController.updateOne('banners')
  )

module.exports = router