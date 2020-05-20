const knex = require('../db/knex')
const utils = require('../utils')

module.exports = {
    deleteOne(table) {
        return async function(req, res, next) {
            try {
                const { id = false } = req.params

                if (!Number.isInteger(Number(id))) {
                    return next(utils.error(500, 'ERROR', 'id should be Integer'))
                }

                const result = await knex(table)
                  .where('id', id)
                  .del()

                if (!result) {
                    return next(utils.error(404, 'NOT FOUND', 'not found'))
                }

                res.json({
                    status: 'done',
                    result
                })
            } catch (e) {
                next(utils.error(500, 'ERROR', e.message))
            }
        }
    }
}