const R = require('ramda')
const knex = require('../db/knex')
const utils = require('../utils')
const modificators = require("../utils/modificators")

module.exports = {
    getAll(table, orderBy = 'order', desc = '', initialFields = {
        public: true
    }) {
        return async function(req, res, next) {
            try {
                const { withUnpublic } = req.query

                const where = R.compose(
                  modificators.removeParamOfQuery(withUnpublic, 'public')
                )(initialFields)

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

    getOne(table, initialFields = {
        public: true
    }) {
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
                    ...initialFields,
                    id
                })

                const review = await knex
                  .select()
                  .from(table)
                  .where(where)
                  .first()

                if (!review)
                    return next(utils.error(404, 'NOT FOUND', `${table} not found`))

                res.json(review)
            } catch (e) {
                next(utils.error(500, 'ERROR', e.message))
            }
        }
    },

    createOne(table) {
        return async function(req, res, next) {
            if (!table) next(utils.error(500, 'ERROR', 'error'))

            try {
                const { id: _, ...base } = req.body

                const id = await knex(table)
                  .returning('id')
                  .insert(base)

                res.json({
                    status: 'done',
                    result: id[0]
                })
            } catch (e) {
                next(utils.error(500, 'ERROR', e.message))
            }
        }
    },

    updateOne(table) {
        return async function(req, res, next) {
            try {
                const { id } = req.params

                // todo FIX all as this
                const found = await knex
                  .select()
                  .from(table)
                  .where('id', '=', id)

                if (!found.length)
                    return next(utils.error(404, 'NOT FOUND', 'ID not found'))

                const updateId = await knex(table)
                  .update(req.body)
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