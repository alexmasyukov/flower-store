const express = require('express')
const cacheControl = require('express-cache-controller')
const router = express.Router()
const { validateSchema, validateProductSizes } = require('../middlewares/jsonSchemaValidator')
const productController = require('../controllers/products')
const { Product } = require('../models/product')
const { ProductSize } = require('../models/productSize')

router.route('/')
   .get(
      cacheControl({ maxAge: 5 }),
      productController.getAllProducts)
   .post(
      validateSchema(Product.jsonSchema),
      validateProductSizes(ProductSize.jsonSchema),
      productController.createProduct
   )

router.route('/:id')
   .get(productController.getProduct)
   .delete(productController.deleteProduct)

router.route('/:id/public')
  .put(productController.putProductPublic)

module.exports = router