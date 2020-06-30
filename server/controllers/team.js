const R = require('ramda')
const knex = require('../db/knex')
const utils = require('../utils')

module.exports = {
  // async getAll(req, res, next) {
  //   try {
  //     const team = await knex
  //       .select()
  //       .from('team')
  //       .where({
  //         public: true,
  //         ...req.query
  //       })
  //       .orderBy('order')
  //
  //     if (!team.length)
  //       return next(utils.error(404, 'error', 'team not found'))
  //
  //     res.json(team)
  //   } catch (e) {
  //     next(utils.error(500, 'ERROR', e.message))
  //   }
  // }

  // async createOne(req, res, next) {
  //    try {
  //       const { id: _, ...base } = req.body
  //       const id = await knex('team')
  //         .returning('id')
  //         .insert(base)
  //
  //       res.json({
  //          status: 'done',
  //          result: id[0]
  //       })
  //    } catch (e) {
  //       next(utils.error(500, 'ERROR', e.message))
  //    }
  // },

  // async updateOne(req, res, next) {
  //    try {
  //       const { id, ...base } = req.body
  //       const updateId = await knex('team')
  //         .update(base)
  //         .where('id', '=', id)
  //         .returning('id')
  //
  //       res.json({
  //          status: 'done',
  //          result: updateId[0]
  //       })
  //    } catch (e) {
  //       next(utils.error(500, 'ERROR', e.message))
  //    }
  // }
}