const R = require('ramda')
const knex = require('../db/knex')
const utils = require('../utils')
const {
  removeWhenIsDefine
} = require('../utils/modificators')

module.exports = {
  getAll(table, orderBy = 'id', desc = '', query = {
    public: true
  }) {
    return async function(req, res, next) {
      try {
        const { all, ...baseQuery } = req.query

        const where = R.compose(
          removeWhenIsDefine(all, 'public')
        )({
          ...query,
          ...baseQuery
        })

        const items = await knex
          .select()
          .from(table)
          .where(where)
          .orderBy(orderBy, desc)

        if (!items.length)
          return next(utils.error(404, 'error', `${table} not found`))

        res.json(items)
      } catch (e) {
        next(utils.error(500, 'ERROR', e.message))
      }
    }
  },

  getOne(table, query = { public: true }, nextMiddleware = false) {
    return async function(req, res, next) {
      try {
        const { all, ...baseQuery } = req.query

        const where = R.compose(
          removeWhenIsDefine(all, 'public')
        )({
          ...query,
          ...baseQuery,
          ...req.params
        })

        const item = await knex
          .select()
          .from(table)
          .where(where)
          .first()

        if (!item)
          return next(utils.error(404, 'error', `${table} not found`))

        if (nextMiddleware) {
          res[nextMiddleware] = item
          return next()
        }

        res.json(item)
      } catch (e) {
        next(utils.error(500, 'ERROR', e.message))
      }
    }
  },

  deleteOne(table) {
    return async function(req, res, next) {
      try {
        const result = await knex(table)
          .where('id', req.params.id)
          .del()

        if (!result) {
          return next(utils.error(404, 'error', 'not found'))
        }

        res.json({
          status: 'done',
          result
        })
      } catch (e) {
        next(utils.error(500, 'ERROR', e.message))
      }
    }
  },

  createOne(table, stringifyFilelds = [], nextMiddleware = false) {
    return async function(req, res, next) {
      try {
        const data = R.compose(
          utils.when(Boolean(stringifyFilelds.length), (data) =>
            stringifyFilelds.reduce((res, field) => ({
              ...res,
              [field]: JSON.stringify(res[field])
            }), data))
        )(req.body)

        const id = await knex(table)
          .insert(data)
          .returning('id')

        res.json({
          status: 'done',
          result: id[0]
        })

        req.lastId = id[0]
        if (nextMiddleware) next()
      } catch (e) {
        next(utils.error(500, 'error', e.message))
      }
    }
  },

  updateOne(table, stringifyFilelds = [], nextMiddleware = false) {
    return async function(req, res, next) {
      try {
        const found = await knex
          .select('id')
          .from(table)
          .where('id', req.params.id)

        if (!found.length)
          return next(utils.error(404, 'error', 'ID not found'))

        const data = R.compose(
          utils.when(Boolean(stringifyFilelds.length), (data) =>
            stringifyFilelds.reduce((res, field) => ({
              ...res,
              [field]: JSON.stringify(res[field])
            }), data))
        )(req.body)

        const id = await knex(table)
          .update(data)
          .where('id', req.params.id)
          .returning('id')

        res.json({
          status: 'done',
          result: id[0]
        })

        req.lastId = id[0]
        if (nextMiddleware) next()
      } catch (e) {
        next(utils.error(500, 'ERROR', e.message))
      }
    }
  }
}