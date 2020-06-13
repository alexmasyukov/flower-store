const knex = require('../db/knex')
const utils = require('../utils')
const axios = require('axios')

module.exports = {
    async test(req, res, next) {
        try {
            const config = await knex
              .select('expose_url')
              .from('bots_viber')
              .where('id', 1)
              .first()

            // const { expose_url } = config

            await axios.post(`http://bot-viber-dev:9999/test`)
              .then(function(response) {
                  res.json({
                      status: 'done',
                      result: response
                  })
              })
              .catch(function(error) {
                  res.json({
                      status: 'error c',
                      result: error
                  })
              })

        } catch (e) {
            res.json({
                status: 'error test',
                result: e
            })
        }

    }
}