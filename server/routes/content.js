const express = require('express')
const cacheControl = require('express-cache-controller')
const router = express.Router()
const contentController = require("../controllers/content")
const { Content } = require('../models/content')
const { validateSchema } = require('../middlewares/jsonSchemaValidator')

router.route('/')
  .get(
    cacheControl({ sMaxAge: 10 }),
    contentController.getAll
  )
  .post(
    validateSchema(Content.jsonSchema),
    contentController.createOne
  )

router.route('/:id')
  .get(
    cacheControl({ sMaxAge: 10 }),
    contentController.getOne
  )
  .put(
    validateSchema(Content.jsonSchema),
    contentController.updateOne
  )
  .delete(contentController.deleteOne)

module.exports = router