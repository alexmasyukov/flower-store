const utils = require('../utils')
const knex = require('../db/knex')


module.exports = {
   async getAll(req, res, next) {
      try {
         const entities = await knex.select().from('entities').orderBy('id')

         if (!entities.length)
            return next(utils.error(404, 'NOT FOUND', 'entities not found'))

         res.json(entities)
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

         const entitie = await knex
            .select()
            .from('entities')
            .where({
               'id': id
            })
            .first()

         if (!entitie)
            return next(utils.error(404, 'NOT FOUND', 'entitie not found'))

         res.json(entitie)
      } catch (e) {
         next(utils.error(500, 'ERROR', e.message))
      }
   },

   async createOne(req, res, next) {
      try {
         const { id: _, ...base } = req.body
         console.log(base)
         const id = await knex('entities')
            .returning('id')
            .insert(base)
            // .toSt ring()

         // console.log(id)

         res.json({
            status: 'done',
            result: id[0]
         })
      } catch (e) {
         next(utils.error(500, 'ERROR', e.message))
      }
   }
}