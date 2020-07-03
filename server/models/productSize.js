const {
  type,
  all,
  minProperties,
  paramsSchema
} = require('../models/common')

class ProductSize {
  static table = 'product_sizes'

  static properties = {
    city_id: { type: 'integer' },
    product_id: { type: 'integer' },
    order: { type: ['integer', 'null'] },
    public: { type: 'boolean' },
    fast: { type: 'boolean' },
    title: { type: 'integer' },
    price: { type: 'integer' },
    diameter: { type: 'integer' },
    flowers: {
      type: "array",
      items: { type: 'integer' },
      minItems: 1
    },
    flowers_counts: {
      type: "array",
      items: { type: 'integer' },
      minItems: 1
    },
    images: {
      type: "array",
      items: { type: 'string' },
      minItems: 1
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
        'diameter',
        'fast',
        'price',
        'flowers',
        'flowers_counts',
        'images'
      ],
      properties
    }
  }

  static paramsSchema = paramsSchema

  static get querySchema() {
    const {
      properties: { flowers, flowers_counts, images, ...properties }
    } = this
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
      properties: {
        public: properties.public
      }
    }
  }
}

module.exports = {
  ProductSize
}