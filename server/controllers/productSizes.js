const knex = require('../db/knex')
const utils = require('../utils')

module.exports = {
    async updateProductSizeProp(req, res, next) {
        try {
            const { id = false, prop = '' } = req.params
            const { value } = req.body

            if (prop === '')
                return next(utils.error(500, 'ERROR', 'prop value should be'))
            if (value !== "true" && value !== "false")
                return next(utils.error(500, 'ERROR', 'public value not Boolean (true/false)'))

            const update = await knex
              .from('product_sizes')
              .where('id', id)
              .update({
                  [prop]: value
              })

            const sizePublic = await knex
              .from('product_sizes')
              .where('id', id)
              .select([prop])
              .first()

            if (!sizePublic)
                return next(utils.error(404, 'NOT FOUND', 'not found'))

            res.json({
                status: 'done',
                result: sizePublic
            })
        } catch (e) {
            next(utils.error(500, 'ERROR', e.message))
        }
    }
}