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

            const banners = await knex
              .select()
              .from('banners')
              .where(where)
              .orderBy('id')

            res.json(banners)
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

            const banner = await knex
              .select()
              .from('banners')
              .where(where)
              .first()

            if (!banner)
                return next(utils.error(404, 'NOT FOUND', 'banner ID not found'))

            res.json(banner)
        } catch (e) {
            next(utils.error(500, 'ERROR', e.message))
        }
    }
}