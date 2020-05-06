// const R = require('ramda')
// const knex = require('../db/knex')
// const utils = require('../utils')
// const modificators = require("../utils/modificators")

module.exports = {
   async getOrderCode(req, res, next) {
      try {
         const code = Math.random().toString().substr(2, 4)
         res.json({
            status: 'done',
            redsult: code
         })
      } catch (e) {
         next(utils.error(500, 'ERROR', e.message))
      }
   }
}