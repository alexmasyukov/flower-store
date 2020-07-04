const R = require('ramda')
const knex = require('../db/knex')
const utils = require('../utils')
const dbService = require("../services/db")
const { removeWhenIsDefine, addWhenIsDefine } = require("../utils/modificators")
const { convertEntitie, when } = utils


function floristToGroup(product) {
  const {
    florist_id,
    florist_name: name,
    florist_photo: photo,
    florist_text: text,
    florist_id: id,
    ...base
  } = product

  if (florist_id && text) {
    return {
      ...base,
      florist: {
        id,
        name,
        photo,
        text
      }
    }
  }

  return base
}


const addSizesToProduct = (allSizes) => (product) => {
  const sizes = allSizes.filter(size => size.product_id === product.id)
  return {
    ...product,
    sizes
  }
}

const additivesIdsToObjects = (allAdditives) => (product) => ({
  ...product,
  additives: allAdditives.filter(({ id }) => product.additives.includes(id))
})


const convertEntitiesToValues = (entities) => (product) => {
  const base = R.compose(
    floristToGroup,
    convertEntitie('color', entities),
    convertEntitie('packing', entities),
    convertEntitie('stability', entities),
    convertEntitie('shade', entities),
    convertEntitie('bouquetType', entities)
    // convertEntitie('collection', entities)
  )(product)

  const sizes = product.sizes.map(size =>
    R.compose(
      convertEntitie('title', entities),
      convertEntitie('flowers', entities)
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

    let productId = 0

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

          productId = ids[0]

          return knex('product_sizes')
            .insert(prepareSizes)
            .transacting(trx)
            .returning('id')
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
      .then(function(inserts) {
        res.json({
          status: 'done',
          result: productId
        })
      })
      .catch(function(e) {
        next(utils.error(500, 'ERROR', e.message))
      })
  },

  async updateProduct(req, res, next) {
    try {
      const { sizes, ...base } = req.body
      const { id } = req.params

      const found = await knex
        .select('id')
        .from('products')
        .where('id', id)

      if (!found.length)
        return next(utils.error(404, 'error', 'ID not found'))

      const updateProductId = await knex('products')
        .where('id', '=', id)
        .update(base)
        .returning('id')

      if (sizes) {
        sizes.forEach(async size => {
          try {
            const updateSize = await knex('product_sizes')
              .where('id', '=', size.id)
              .update(size)
          } catch (e) {
            return next(utils.error(500, 'error', e.errors))
          }
        })
      }

      if (!updateProductId.length) {
        return next(utils.error(404, 'error', 'product id not found'))
      }

      res.json({
        status: 'done',
        result: updateProductId[0]
      })
    } catch (e) {
      next(utils.error(500, 'error', e.message))
    }
  },


  async getAllProducts(req, res, next) {
    try {
      const { all, public: is_public, convert_entities, city_id } = req.query

      const whereOfProducts = R.compose(
        removeWhenIsDefine(all, 'products.public'),
        addWhenIsDefine(is_public, { 'products.public': is_public }),
        addWhenIsDefine(city_id, { 'products.city_id': city_id })
      )({
        'products.public': true,
        // ...baseQuery,
        ...req.params
      })

      const whereOfSizes = R.compose(
        removeWhenIsDefine(all, 'public')
      )({
        public: true
      })

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


      if (!products.length)
        return next(utils.error(404, 'error', 'products not found'))

      const entities = utils.normalize(await knex.select().from('entities'), 'id')
      const additives = await dbService.getAllAdditives()

      const productsIds = products.map(product => product.id)
      const productsSizes = await knex
        .select()
        .from('product_sizes')
        .where(whereOfSizes)
        .whereIn('product_id', productsIds)
        .orderBy('title')

      const finisedProducts = products
        .map(product =>
          R.compose(
            when(convert_entities === true, additivesIdsToObjects(additives)),
            when(convert_entities === true, convertEntitiesToValues(entities)),
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
      const { id } = req.params
      const {
        all,
        public: is_public,
        convert_entities,
        city_id
      } = req.query

      const whereOfProducts = R.compose(
        removeWhenIsDefine(all, 'products.public'),
        addWhenIsDefine(city_id, { 'products.city_id': city_id }),
        addWhenIsDefine(is_public, { 'products.public': is_public })
      )({
        'products.public': true,
        'products.id': id
      })

      const whereOfSizes = R.compose(
        removeWhenIsDefine(all, 'public')
      )({
        public: true
      })

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
        return next(utils.error(404, 'error', 'product not found'))
      }

      const productSizes = await knex
        .select()
        .from('product_sizes')
        .where(whereOfSizes)
        .where('product_id', product.id)
        .orderBy('title')

      if (!productSizes.length) {
        return next(utils.error(404, 'error', 'product sizes not found'))
      }

      const entities = utils.normalize(await knex.select().from('entities'), 'id')
      const additives = await dbService.getAllAdditives()

      const finishedProduct = R.compose(
        when(convert_entities === true, additivesIdsToObjects(additives)),
        when(convert_entities === true, convertEntitiesToValues(entities)),
        addSizesToProduct(productSizes)
      )(product)

      res.json(finishedProduct)
    } catch (e) {
      next(utils.error(500, 'ERROR', e.message))
    }
  }

  // async updateProductField(req, res, next) {
  //     try {
  //         const { id = false, field } = req.params
  //         const { value } = req.body
  //
  //         if (!Number.isInteger(Number(id))) {
  //             return next(utils.error(500, 'ERROR', 'id should be Integer'))
  //         }
  //
  //         if (field === undefined)
  //             return next(utils.error(500, 'ERROR', 'field should be'))
  //         if (value === undefined)
  //             return next(utils.error(500, 'ERROR', 'value should be'))
  //
  //         const update = await knex
  //           .from('products')
  //           .where('id', id)
  //           .update({
  //               [field]: value
  //           })
  //
  //         const porductField = await knex
  //           .from('products')
  //           .where('id', id)
  //           .select([field])
  //           .first()
  //
  //         if (!porductField)
  //             return next(utils.error(404, 'NOT FOUND', 'not found'))
  //
  //         res.json({
  //             status: 'done',
  //             result: porductField
  //         })
  //     } catch (e) {
  //         next(utils.error(500, 'ERROR', e.message))
  //     }
  // },

  // async updateOrder(req, res, next) {
  //     try {
  //         const { direction, value } = req.body
  //
  //         if (value === undefined || direction === undefined)
  //             return next(utils.error(500, 'ERROR', 'field should be'))
  //
  //         const products = await knex
  //           .select('id')
  //           .from('products')
  //           .where('order', '>=', value)
  //           .order('order')
  //           .limit(2)
  //
  //         if (!products)
  //             return next(utils.error(404, 'NOT FOUND', 'not found'))
  //
  //         // products.forEach(async product => {
  //         //     try {
  //         //         const updateSize = await knex('product_sizes')
  //         //           .where('id', '=', size.id)
  //         //
  //         //
  //         //         const updateProduct = await knex
  //         //           .from('products')
  //         //           .where('id', product.id)
  //         //           .update('order', )
  //         //     } catch (e) {
  //         //         return next(utils.error(500, 'ERROR', e.errors))
  //         //     }
  //         // })
  //
  //
  //         // const update = await knex
  //         //   .from('products')
  //         //   .where('id', id)
  //         //   .update({
  //         //       [field]: value
  //         //   })
  //
  //
  //         res.json({
  //             status: 'done',
  //             result: products
  //         })
  //     } catch (e) {
  //         next(utils.error(500, 'ERROR', e.message))
  //     }
  // }
}