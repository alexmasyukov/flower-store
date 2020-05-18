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

            const content = await knex
              .select()
              .from('content')
              .where(where)
              .orderBy('order')

            res.json(content)
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

            const content = await knex
              .select()
              .from('content')
              .where(where)
              .first()

            if (!content)
                return next(utils.error(404, 'NOT FOUND', 'banner ID not found'))

            res.json(content)
        } catch (e) {
            next(utils.error(500, 'ERROR', e.message))
        }
    },

    async createOne(req, res, next) {
        try {
            const { id: _, ...base } = req.body
            const id = await knex('content')
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
            const updateId = await knex('content')
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
    },

    async deleteOne(req, res, next) {
        try {
            const { id = false } = req.params

            if (!Number.isInteger(Number(id))) {
                return next(utils.error(500, 'ERROR', 'id should be Integer'))
            }

            const result = await knex('content')
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