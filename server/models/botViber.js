const {
  type,
  all,
  limit,
  minProperties,
  paramsSchema
} = require('../models/common')

class BotViber {
  static table = 'bots_viber'

  static properties = {
    city_id: { type: 'integer' },
    token: { type: 'string' },
    subscribe_password: { type: 'string' },
    notify_subscribers: {
      type: "array",
      items: {
        type: "object",
        required: [
          'id',
          'name'
        ],
        properties: {
          id: { type: 'string' },
          name: { type: 'string' }
        }
      }
    },
    extra: { type: ['object', 'null'] },
    expose_url: { type: 'string' },
    expose_url_dev: { type: 'string' },
  }

  static get bodySchema() {
    const { properties } = this
    return {
      type,
      minProperties,
      required: [
        'city_id',
        'token',
        'subscribe_password',
        'notify_subscribers',
        'expose_url_dev',
        'expose_url'
      ],
      properties
    }
  }

  static paramsSchema = paramsSchema

  static get querySchema() {
    const { properties: { extra, ...properties } } = this
    return {
      type,
      properties: {
        all,
        limit,
        ...properties
      }
    }
  }

  static get updateSchema() {
    const { properties } = this
    return {
      type,
      minProperties,
      properties
    }
  }
}

module.exports = {
  BotViber
}