const knex = require('../db/knex')
const utils = require('../utils')

module.exports = {
   async confirmation(req, res, next) {
      const code = Math.random().toString().substr(2, 4)
      res.json({
         status: 'done',
         redsult: code
      })
   }
}