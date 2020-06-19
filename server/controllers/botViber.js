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
      const baseUrl = process.env.VIBER_BOT_CONTAINER_URL
        || 'http://bot-viber-dev:9999'

      await axios.post(`${baseUrl}/test`)
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
  },

  async send(req, res, next) {
    try {
      const { msg } = req.body

      if (!msg)
        return next(utils.error(500, 'msg', 'msg is empty'))

      // const config = await knex
      //   .select('expose_url')
      //   .from('bots_viber')
      //   .where('id', 1)
      //   .first()
      //
      // const { expose_url } = config

      const baseUrl = process.env.VIBER_BOT_CONTAINER_URL
        || 'http://bot-viber-dev:9999'

      axios({
        method: 'post',
        url: `${baseUrl}/send`,
        data: {
          msg
        }
      })
        .then(function(response) {
          res.json({
            status: 'done',
            result: response
          })
        })
        .catch(function(error) {
          res.json({
            status: 'error send',
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