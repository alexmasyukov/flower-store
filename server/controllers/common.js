const R = require('ramda')
const knex = require('../db/knex')
const utils = require('../utils')
const modificators = require("../utils/modificators")

module.exports = {
    getAll(table, orderBy = 'order', desc = '') {
        return async function(req, res, next) {
            try {
                const { withUnpublic } = req.query

                const where = R.compose(
                  modificators.removeParamOfQuery(withUnpublic, 'public')
                )({
                    public: true
                })

                const reviews = await knex
                  .select()
                  .from(table)
                  .where(where)
                  .orderBy(orderBy, desc)

                res.json(reviews)
            } catch (e) {
                next(utils.error(500, 'ERROR', e.message))
            }
        }
    },

    getOne(table) {
        return async function(req, res, next) {
            try {
                const { withUnpublic } = req.query
                const { id } = req.params

                if (!Number.isInteger(Number(id))) {
                    return next(utils.error(500, 'ERROR', 'id should be Integer'))
                }

                const where = R.compose(
                  modificators.removeParamOfQuery(withUnpublic, 'public')
                )({
                    id,
                    public: true
                })

                const review = await knex
                  .select()
                  .from(table)
                  .where(where)
                  .first()

                if (!review)
                    return next(utils.error(404, 'NOT FOUND', `${table} ID not found`))

                res.json(review)
            } catch (e) {
                next(utils.error(500, 'ERROR', e.message))
            }
        }
    },

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