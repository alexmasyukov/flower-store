const knex = require('../db/knex')
const utils = require('../utils')

module.exports = {
    async createOne(req, res, next) {
        try {
            const { id: _, data: initData, ...base } = req.body
            const data = JSON.stringify(initData)

            const id = await knex('additives')
              .returning('id')
              .insert({
                  ...base,
                  data
              })

            res.json({
                status: 'done',
                result: id[0]
            })
        } catch (e) {
            next(utils.error(500, 'ERROR', e.message))
        }
    },

    async updateOne(req, res, next) {
        try {
            // todo Узнать как правильно, по внутреннему id или по внешнему
            const { id, data: initData, ...base } = req.body
            const data = JSON.stringify(initData)

            // todo FIX all as this
            const found = await knex
              .select()
              .from('additives')
              .where('id', '=', id)

            if (!found.length)
                return next(utils.error(404, 'NOT FOUND', 'ID not found'))

            const updateId = await knex('additives')
              .update({
                  ...base,
                  data
              })
              .where('id', '=', id)
              .returning('id')

            res.json({
                status: 'done',
                result: updateId[0]
            })
        } catch (e) {
            next(utils.error(500, 'ERROR', e.message))
        }
    }
}