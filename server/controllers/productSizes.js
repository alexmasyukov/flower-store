const knex = require('../db/knex')
const utils = require('../utils')

module.exports = {
    async updateProductSizeField(req, res, next) {
        try {
            const { id = false, field } = req.params
            const { value } = req.body

            if (field === undefined)
                return next(utils.error(500, 'ERROR', 'field should be'))
            if (value === undefined)
                return next(utils.error(500, 'ERROR', 'value should be'))

            const update = await knex
              .from('product_sizes')
              .where('id', id)
              .update({
                  [field]: value
              })

            const sizePublic = await knex
              .from('product_sizes')
              .where('id', id)
              .select([field])
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