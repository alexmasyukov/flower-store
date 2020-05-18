const express = require('express')
const cacheControl = require('express-cache-controller')
const router = express.Router()
const entitiesController = require('../controllers/entities')
const { validateSchema } = require('../middlewares/jsonSchemaValidator')
const { Entitie } = require('../models/entities')

router.route('/')
   .get(
      cacheControl({ maxAge: 5 }),
      entitiesController.getAll
   )
   .post(
      validateSchema(Entitie.jsonSchema),
      entitiesController.createOne
   )

router.route('/:id')
   .get(entitiesController.getOne)
  .put(
    validateSchema(Entitie.jsonSchema),
    entitiesController.updateOne
  )

module.exports = router