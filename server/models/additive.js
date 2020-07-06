const {
  type,
  all,
  limit,
  minProperties,
  paramsSchema
} = require('../models/common')


class Additive {
  static table = 'additives'

  static properties = {
    city_id: { type: 'integer' },
    order: { type: 'integer' },
    public: { type: 'boolean' },
    title: { type: 'string' },
    cart_title: { type: 'string' },
    data: {
      type: "array",
      items: {
        type: "object",
        required: [
          'order',
          'button',
          'price',
          'image'
        ],
        properties: {
          order: { type: 'integer' },
          button: { type: 'string' },
          price: { type: 'integer' },
          image: { type: 'string' }
        }
      }
    }
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
        'cart_title',
        'data'
      ],
      properties
    }
  }

  static paramsSchema = paramsSchema

  static get querySchema() {
    const { properties: { data, ...properties } } = this

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
  Additive
}