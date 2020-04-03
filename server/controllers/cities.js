const utils = require('../utils')
const knex = require('../db/knex')


module.exports = {
   async getAllCities(req, res, next) {
      try {
         const cities = await knex.select().from('cities')

         if (!cities.length)
            return next(utils.error(404, 'NOT FOUND', 'cities not found'))

         res.json(cities)
      } catch (e) {
         next(utils.error(500, 'ERROR', e.message))
      }
   },

   async getCity(req, res, next) {
      try {
         // todo: fix it
         const { id = false } = req.params
         if (!Number.isInteger(Number(id))) {
            return next(utils.error(500, 'ERROR', 'id should be Integer'))
         }

         const city = await knex
            .select()
            .from('cities')
            .where({
               'id': id
            })
            .first()

         if (!city)
            return next(utils.error(404, 'NOT FOUND', 'city not found'))

         res.json(city)
      } catch (e) {
         next(utils.error(500, 'ERROR', e.message))
      }
   }
}