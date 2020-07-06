const {
  type,
  all,
  limit,
  minProperties,
  paramsSchema
} = require('../models/common')

class Product {
  static table = 'products'

  static properties = {
    city_id: { type: 'integer' },
    public: { type: 'boolean' },
    order: { type: ['integer', 'null'] },
    slug: { type: 'string' },
    title: { type: 'string', maxLength: 255 },
    description: { type: 'string', maxLength: 1000 },
    color: { type: 'integer' },
    stability: { type: 'integer' },
    shade: { type: 'integer' },
    packing: { type: 'integer' },
    bouquetType: { type: 'integer' },
    florist_id: { type: 'integer' },
    florist_text: { type: 'string' },
    sizes: {
      type: 'array',
      items: { type: 'object' },
      minItems: 1
    },
    additives: {
      type: 'array',
      items: { type: 'integer' }
    }
  }

  static get bodySchema() {
    const { properties } = this
    return {
      type,
      minProperties,
      properties,
      required: [
        'city_id',
        'public',
        // 'available',
        'slug',
        'title',
        'stability',
        'shade',
        'color',
        'packing',
        'bouquetType',
        'florist_id',
        'florist_text',
        'sizes'
      ]
    }
  }

  static paramsSchema = paramsSchema

  static get querySchema() {
    const {
      properties: {
        sizes,
        additives,
        description,
        ...properties
      }
    } = this
    return {
      type,
      properties: {
        convert_entities: { type: 'boolean' },
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
  Product
}


// available: { type: ['string', 'null'] }, //, format: 'date-time'
// collection: {
//     type: "array",
//     items: { type: "integer" },
//     uniqueItems: true
// },
// additionalProducts: {
//     type: "array",
//     items: { type: "integer" },
//     uniqueItems: true
// },


// address: {
//    type: 'object',
//    properties: {
//       street: { type: 'string' },
//       city: { type: 'string' },
//       zipCode: { type: 'string' }
//    }
// }