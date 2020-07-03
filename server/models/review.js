const {
  type,
  all,
  minProperties,
  paramsSchema
} = require('../models/common')

class Review {
  static table = 'reviews'

  static properties = {
    city_id: { type: 'integer' },
    order: { type: 'integer' },
    public: { type: 'boolean' },
    name: { type: 'string' },
    telegram: { type: 'string' },
    instagram: { type: 'string' },
    text: { type: 'string' }
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
        'name',
        'telegram',
        'instagram',
        'text'
      ],
      properties
    }
  }

  static paramsSchema = paramsSchema

  static get querySchema() {
    const { properties: { text, ...properties } } = this
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
  Review
}