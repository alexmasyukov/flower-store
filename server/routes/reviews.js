const express = require('express')
const cacheControl = require('express-cache-controller')
const router = express.Router()
const reviewsController = require("../controllers/reviews")
const commonController = require("../controllers/common")
const { Review } = require('../models/review')
const { validateSchema } = require('../middlewares/jsonSchemaValidator')

router.route('/')
  .get(
    cacheControl({ MaxAge: 10 }),
    reviewsController.getAll
  )
  .post(
    validateSchema(Review.jsonSchema),
    reviewsController.createOne
  )

router.route('/:id')
  .get(
    cacheControl({ MaxAge: 10 }),
    reviewsController.getOne)
  .put(
    validateSchema(Review.jsonSchema),
    reviewsController.updateOne
  )
  .delete(commonController.deleteOne('reviews'))

module.exports = router