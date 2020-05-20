const R = require('ramda')
const knex = require('../db/knex')
const utils = require('../utils')
const modificators = require("../utils/modificators")

module.exports = {
    async getAll(req, res, next) {
        try {
            const { withUnpublic } = req.query

            const where = R.compose(
              modificators.removeParamOfQuery(withUnpublic, 'public'),
            )({
                public: true
            })

            const reviews = await knex
              .select()
              .from('reviews')
              .where(where)
              .orderBy('created_at', 'desc')

            res.json(reviews)
        } catch (e) {
            next(utils.error(500, 'ERROR', e.message))
        }
    },

    async getOne(req, res, next) {
        try {
            const { withUnpublic } = req.query
            const { id } = req.params

            if (!Number.isInteger(Number(id))) {
                return next(utils.error(500, 'ERROR', 'id should be Integer'))
            }

            const where = R.compose(
              modificators.removeParamOfQuery(withUnpublic, 'public'),
            )({
                id,
                public: true
            })

            const review = await knex
              .select()
              .from('reviews')
              .where(where)
              .first()

            if (!review)
                return next(utils.error(404, 'NOT FOUND', 'review ID not found'))

            res.json(review)
        } catch (e) {
            next(utils.error(500, 'ERROR', e.message))
        }
    },

    async createOne(req, res, next) {
        try {
            const { id: _, ...base } = req.body
            const id = await knex('reviews')
              .returning('id')
              .insert(base)

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
            const { id, ...base } = req.body
            const updateId = await knex('reviews')
              .update(base)
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