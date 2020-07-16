const knex = require('../db/knex')
const utils = require('../utils')
const axios = require('axios')

module.exports = {
  async test(req, res, next) {
    try {
      // const config = await knex
      //   .select('expose_url')
      //   .from('bots_viber')
      //   .where('id', 1)
      //   .first()

      // const { expose_url } = config
      // const baseUrl = process.env.VIBER_BOT_CONTAINER_URL
      const baseUrl = 'http://bot-viber-dev:9999'
      // || 'http://bot-viber-dev:9999'

      const test = await axios({
        method: 'post',
        url: `${baseUrl}/test`
      })
      res.json({
        status: 'done',
        result: test.data
      })

    } catch (e) {
      res.json({
        status: 'error test',
        result: e
      })
    }
  },

  async sendMessage(req, res, next) {
    try {
      const { messages, buttons = [] } = req.body

      if (!messages)
        return next(utils.error(500, 'msg', 'msg is empty'))

      // const config = await knex
      //   .select('expose_url')
      //   .from('bots_viber')
      //   .where('id', 1)
      //   .first()
      //
      // const { expose_url } = config

      const baseUrl = //process.env.VIBER_BOT_CONTAINER_URL
        'http://bot-viber-dev:9999' //urlBotContainer

      const result = await axios({
        method: 'post',
        url: `${baseUrl}/send`,
        data: {
          messages,
          buttons
        }
      })

      res.json({
        status: 'done',
        result: {}
      })
    } catch (e) {
      res.json({
        status: 'error send',
        result: e
      })
    }
  }
}