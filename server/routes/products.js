const express = require('express')
// const cacheControl = require('express-cache-controller')
const router = express.Router()
const productController = require('../controllers/products')
const commonController = require('../controllers/common')
const { Product } = require('../models/product')
const { ProductSize } = require('../models/productSize')
const {
  validateQuery,
  validateBody,
  validateParams,
  validateProductSizes
} = require('../middlewares/jsonSchemaValidator')

// cacheControl({ maxAge: 5 }),

router.route('/')
  .get(
    validateQuery(Product.querySchema),
    productController.getAllProducts
  )
  .post(
    validateBody(Product.bodySchema),
    validateProductSizes(ProductSize.bodySchema),
    productController.createProduct
  )

router.route('/:id')
  .get(
    validateParams(Product.paramsSchema),
    validateQuery(Product.querySchema),
    productController.getProduct
  )
  .put(
    validateParams(Product.paramsSchema),
    validateBody(Product.updateSchema),
    // todo: fix it может внутрь товара положить схему размеров
    // validateProductSizes(ProductSize.updateSchema),
    productController.updateProduct
  )
  .delete(
    validateParams(Product.paramsSchema),
    commonController.deleteOne(Product.table)
  )


// router.route('/:id/:field')
//   .put(productController.updateProductField)
// router.route('/update-order')
//   .put(productController.updateOrder)

module.exports = router