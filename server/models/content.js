const {
  type,
  all,
  minProperties,
  paramsSchema
} = require('../models/common')

class Content {
  static table = 'content'

  static properties = {
    city_id: { type: 'integer' },
    order: { type: 'integer' },
    public: { type: 'boolean' },
    title: { type: 'string' },
    content: { type: 'string' }
  }

  static get bodySchema() {
    const { properties } = this
    return {
      type,
      minProperties,
      required: [
        'city_id',
        'order',
        'public',
        'title',
        'content'
      ],
      properties
    }
  }

  static paramsSchema = paramsSchema

  static get querySchema() {
    const { properties: { content, ...properties } } = this
    return {
      type,
      properties: {
        all,
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
  Content
}