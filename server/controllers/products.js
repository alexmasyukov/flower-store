const R = require('ramda')
const knex = require('../db/knex')
const utils = require('../utils')
const modificators = require("../utils/modificators")
const { convertEntitie, isBoolean } = utils


function floristToGroup(product) {
    const {
        florist_id,
        florist_name: name,
        florist_photo: photo,
        florist_text: text,
        florist_id: id,
        ...basicProduct
    } = product

    if (florist_id && text) {
        return {
            ...basicProduct,
            florist: {
                id,
                name,
                photo,
                text
            }
        }
    }

    return basicProduct
}


const addSizesToProduct = (allSizes) => (product) => {
    const sizes = allSizes.filter(size => size.product_id === product.id)
    return {
        ...product,
        sizes
    }
}


const convertIntitiesToValues = (entities) => (product) => {
    const base = R.compose(
      floristToGroup,
      convertEntitie('colors', entities),
      convertEntitie('packing', entities),
      convertEntitie('stability', entities),
      convertEntitie('shade', entities),
      convertEntitie('collection', entities)
    )(product)

    const sizes = product.sizes.map(size =>
      R.compose(
        convertEntitie('flowers_count', entities),
        convertEntitie('title', entities)
      )(size))

    return {
        ...base,
        sizes
    }
}


// https://restfulapi.net/http-status-codes/

module.exports = {
    async createProduct(req, res, next) {
        const { sizes, ...base } = req.body

        knex.transaction(function(trx) {
            knex
              .insert(base)
              .into('products')
              .transacting(trx)
              .returning('id')
              .then((ids) => {
                  const prepareSizes = sizes.map(size => ({
                      ...size,
                      product_id: ids[0]
                  }))
                  return knex('product_sizes')
                    .insert(prepareSizes)
                    .transacting(trx)
                    .returning('id')
              })
              .then(trx.commit)
              .catch(trx.rollback)
        })
          .then(function(inserts) {
              console.log(inserts.length + ' new books saved.')
              res.json({
                  status: 'done',
                  result: inserts.length
              })
          })
          .catch(function(e) {
              next(utils.error(500, 'ERROR', e.message))
          })
    },

    async updateProduct(req, res, next) {
        try {
            const { sizes, id: _id, ...base } = req.body
            const { id = false } = req.params

            if (!Number.isInteger(Number(id))) {
                return next(utils.error(500, 'ERROR', 'id should be Integer'))
            }

            const updateProductId = await knex('products')
              .where('id', '=', id)
              .update(base)
              .returning('id')

            sizes.forEach(async size => {
                try {
                    const updateSize = await knex('product_sizes')
                      .where('id', '=', size.id)
                      .update(size)
                } catch (e) {
                    return next(utils.error(500, 'ERROR', e.errors))
                }
            })

            // sizes.forEach(async size => {
            //     size.product_id = newProductId.toString()
            //     const sizeId = await knex('product_sizes')
            //       .insert(size)
            //       .returning('id')
            // })

            if (!updateProductId.length) {
                return next(utils.error(500, 'ERROR', 'product id not found'))
            }

            res.json({
                status: 'done',
                result: updateProductId[0]
            })
        } catch (e) {
            next(utils.error(500, 'ERROR', e.message))
        }
    },

    async deleteProduct(req, res, next) {
        try {
            const { id = false } = req.params

            if (!Number.isInteger(Number(id))) {
                return next(utils.error(500, 'ERROR', 'id should be Integer'))
            }

            // product sizes deletes on CASCADE in PostgreSQL
            const result = await knex('products')
              .where('id', id)
              .del()

            if (!result) {
                return next(utils.error(404, 'NOT FOUND', 'product not found'))
            }

            res.json({
                status: 'done',
                result
            })
        } catch (e) {
            next(utils.error(500, 'ERROR', e.message))
        }
    },

    async getAllProducts(req, res, next) {
        try {
            const { withUnpublic, withUnpublicSizes, convertEntities } = req.query

            const whereOfProducts = R.compose(
              modificators.removeParamOfQuery(withUnpublic, 'products.public')
            )({ 'products.public': true })

            const whereOfSizes = R.compose(
              modificators.removeParamOfQuery(withUnpublicSizes, 'public')
            )({ 'public': true })


            const products = await knex
              .column(
                'products.*',
                { florist_photo: 'team.photo' },
                { florist_name: 'team.name' },
                { florist_id: 'team.id' }
              )
              .select()
              .from('products')
              .leftJoin('team', 'team.id', 'products.florist_id')
              .where(whereOfProducts)
              .orderBy('products.order')
            // .toString()

            if (!products.length)
                res.json([])

            const entities = utils.normalize(await knex.select().from('entities'), 'id')

            const productsIds = products.map(product => product.id)
            const productsSizes = await knex
              .select()
              .from('product_sizes')
              .where(whereOfSizes)
              .whereIn('product_id', productsIds)
              .orderBy('order')

            const entitiesToValues = (entities) => {
                if (convertEntities === 'false') {
                    return (products) => products
                }
                return convertIntitiesToValues(entities)
            }

            const finisedProducts = products
              .map(product =>
                R.compose(
                  entitiesToValues(entities),
                  addSizesToProduct(productsSizes)
                )(product))
              .filter(product => 'sizes' in product && product.sizes.length)

            res.json(finisedProducts)
        } catch (e) {
            next(utils.error(500, 'ERROR', e.message))
        }
    },

    async getProduct(req, res, next) {
        try {
            const { id = false } = req.params

            const { withUnpublic, withUnpublicSizes, convertEntities } = req.query

            const whereOfProducts = R.compose(
              modificators.removeParamOfQuery(withUnpublic, 'products.public')
            )({
                'products.public': true,
                'products.id': id
            })

            const whereOfSizes = R.compose(
              modificators.removeParamOfQuery(withUnpublicSizes, 'public')
            )({ 'public': true })


            if (!Number.isInteger(Number(id))) {
                return next(utils.error(500, 'ERROR', 'id should be Integer'))
            }

            const product = await knex
              .column(
                'products.*',
                { florist_photo: 'team.photo' },
                { florist_name: 'team.name' },
                { florist_id: 'team.id' }
              )
              .select()
              .from('products')
              .leftJoin('team', 'team.id', 'products.florist_id')
              .where(whereOfProducts)
              .first()

            if (!product) {
                return next(utils.error(404, 'NOT FOUND', 'product not found'))
            }

            const productSizes = await knex
              .select()
              .from('product_sizes')
              .where(whereOfSizes)
              .where('product_id', product.id)

            if (!productSizes.length) {
                return next(utils.error(404, 'NOT FOUND', 'product sizes not found'))
            }

            const entities = utils.normalize(await knex.select().from('entities'), 'id')

            const entitiesToValues = (entities) => {
                if (convertEntities === 'false') {
                    return (products) => products
                }
                return convertIntitiesToValues(entities)
            }

            const finishedProduct = R.compose(
              entitiesToValues(entities),
              addSizesToProduct(productSizes)
            )(product)

            res.json(finishedProduct)
        } catch (e) {
            next(utils.error(500, 'ERROR', e.message))
        }
    },

    async updateProductField(req, res, next) {
        try {
            const { id = false, field = false } = req.params
            const { value } = req.body

            if (!Number.isInteger(Number(id))) {
                return next(utils.error(500, 'ERROR', 'id should be Integer'))
            }

            if (value === undefined)
                return next(utils.error(500, 'ERROR', 'value would be'))

            const update = await knex
              .from('products')
              .where('id', id)
              .update({
                  [field]: value
              })

            const porductField = await knex
              .from('products')
              .where('id', id)
              .select([field])
              .first()

            if (!porductField)
                return next(utils.error(404, 'NOT FOUND', 'not found'))

            res.json({
                status: 'done',
                result: porductField
            })
        } catch (e) {
            next(utils.error(500, 'ERROR', e.message))
        }
    }
}