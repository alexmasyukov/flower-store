const R = require('ramda')
const knex = require('../db/knex')
const utils = require('../utils')
const modificators = require("../utils/modificators")

module.exports = {
   async getAll(req, res, next) {
      try {
         const { withUnpublic, isFlorist } = req.query

         const where = R.compose(
            modificators.removeParamOfQuery(withUnpublic, 'public'),
            modificators.addParamOfQuery(isFlorist, { isFlorist: isFlorist === 'true' || isFlorist === '' })
         )({
            public: true
         })

         const team = await knex
            .select()
            .from('team')
            .where(where)
            .orderBy('order')

         if (!team.length)
            return next(utils.error(404, 'NOT FOUND', 'team not found'))

         res.json(team)
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

         const team = await knex
            .select()
            .from('team')
            .where({
               id,
               public: true
            })
            .first()

         if (!team)
            return next(utils.error(404, 'NOT FOUND', 'ID not found'))

         res.json(team)
      } catch (e) {
         next(utils.error(500, 'ERROR', e.message))
      }
   }
}