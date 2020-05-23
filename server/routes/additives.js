const express = require('express')
const cacheControl = require('express-cache-controller')
const router = express.Router()
const additivesController = require("../controllers/additives")
const commonController = require("../controllers/common")
const { Additive } = require('../models/additive')
const { validateSchema } = require('../middlewares/jsonSchemaValidator')

router.route('/')
  .get(
    cacheControl({ MaxAge: 10 }),
    commonController.getAll('additives', 'id', 'desc')
  )
  .post(
    validateSchema(Additive.jsonSchema),
    additivesController.createOne
  )

router.route('/:id')
  .get(
    cacheControl({ MaxAge: 10 }),
    commonController.getOne('additives')
  )
  .put(
    validateSchema(Additive.jsonSchema),
    additivesController.updateOne
  )
  .delete(commonController.deleteOne('additives'))

module.exports = router