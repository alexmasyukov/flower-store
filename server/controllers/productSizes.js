const knex = require('../db/knex')
const utils = require('../utils')

module.exports = {
    async updateProductSizeProp(req, res, next) {
        try {
            console.log('updateProductSizeProp')
            const { id = false, prop = '' } = req.params

            if (prop === '')
                return next(utils.error(500, 'ERROR', 'prop value should be'))
            if (req.query.value !== "true" && req.query.value !== "false")
                return next(utils.error(500, 'ERROR', 'public value not Boolean (true/false)'))

            const update = await knex
              .from('product_sizes')
              .where('id', id)
              .update({
                  [prop]: req.query.value
              })

            const sizePublic = await knex
              .from('product_sizes')
              .where('id', id)
              .select([prop])
              .first()

            res.json({
                status: 'done',
                result: sizePublic
            })
        } catch (e) {
            next(utils.error(500, 'ERROR', e.message))
        }
    }
}