const {
  type,
  all,
  limit,
  minProperties,
  paramsSchema
} = require('../models/common')

class Order {
  static table = 'orders'

  static properties = {
    city_id: { type: 'integer' },
    customer_id: { type: 'integer' },
    complete: { type: 'boolean' },
    steps: { type: "object" },
    steps_text: { type: "string" },
    products: { type: "array" }
  }

  static get bodySchema() {
    const { properties } = this
    return {
      type,
      minProperties,
      required: [
        'city_id',
        'customer_id',
        'complete',
        'steps',
        'steps_text',
        'products'
      ],
      properties
    }
  }

  static paramsSchema = paramsSchema

  static get querySchema() {
    const { properties: { products, steps, ...properties } } = this
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
    const { properties: { complete } } = this
    return {
      type,
      minProperties,
      properties: {
        complete
      }
    }
  }
}

module.exports = {
  Order
}