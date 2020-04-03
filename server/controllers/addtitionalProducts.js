const utils = require('../utils')
const knex = require('../db/knex')


module.exports = {
   async getAll(req, res, next) {
      try {
         const additionalProducts = await knex
            .select()
            .from('additional_products')
            .where('public', true)

         if (!additionalProducts.length)
            return next(utils.error(404, 'NOT FOUND', 'additional products not found'))

         res.json(additionalProducts)
      } catch (e) {
         next(utils.error(500, 'ERROR', e.message))
      }
   },

   async getOne(req, res, next) {
      try {
         // todo: fix it
         const { id = false } = req.params
         if (!Number.isInteger(Number(id))) {
            return next(utils.error(500, 'ERROR', 'id should be Integer'))
         }

         const additionalProduct = await knex
            .select()
            .from('additional_products')
            .where({
               'id': id,
               'public': true
            })
            .first()

         if (!additionalProduct)
            return next(utils.error(404, 'NOT FOUND', 'additional product not found'))

         res.json(additionalProduct)
      } catch (e) {
         next(utils.error(500, 'ERROR', e.message))
      }
   }
}