const knex = require('../db/knex')
const utils = require('../utils')

module.exports = {
    async putProductSizePublic(req, res, next) {
        try {
            const { id = false } = req.params

            if (req.query.public !== "true" && req.query.public !== "false")
                return next(utils.error(500, 'ERROR', 'public value not Boolean (true/false)'))

            const update = await knex
              .from('product_sizes')
              .where('id', id)
              .update({
                  public: req.query.public
              })

            const sizePublic = await knex
              .from('product_sizes')
              .where('id', id)
              .select(['public'])
              .first()

            res.json(sizePublic)
        } catch (e) {
            next(utils.error(500, 'ERROR', e.message))
        }
    }
}