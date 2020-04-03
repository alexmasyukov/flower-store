const utils = require('../utils')
const knex = require('../db/knex')


module.exports = {
   async getAll(req, res, next) {
      try {
         const florists = await knex
            .select()
            .from('team')
            .where({
               isFlorist: true,
               public: true
            })

         if (!florists.length)
            return next(utils.error(404, 'NOT FOUND', 'florists not found'))

         res.json(florists)
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

         const florist = await knex
            .select()
            .from('team')
            .where({
               id,
               isFlorist: true,
               public: true
            })

         if (!florist)
            return next(utils.error(404, 'NOT FOUND', 'florist not found'))

         res.json(florist)
      } catch (e) {
         next(utils.error(500, 'ERROR', e.message))
      }
   }
}