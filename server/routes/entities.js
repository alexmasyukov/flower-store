const express = require('express')
const cacheControl = require('express-cache-controller')
const router = express.Router()
const entitiesController = require('../controllers/entities')

router.route('/')
   .get(
      cacheControl({ maxAge: 5 }),
      entitiesController.getAll
   )
   .post(
      // todo add validation
      // validateSchema(Product.jsonSchema),
      // validateProductSizes(ProductSize.jsonSchema),
      entitiesController.createOne
   )

router.route('/:id')
   .get(entitiesController.getOne)

module.exports = router