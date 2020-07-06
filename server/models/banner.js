const {
  type,
  all,
  limit,
  minProperties,
  paramsSchema
} = require('../models/common')

class Banner {
  static table = 'banners'

  static properties = {
    city_id: { type: 'integer' },
    order: { type: 'integer' },
    public: { type: 'boolean' },
    title: { type: 'string' },
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
        'images'
      ],
      properties
    }
  }

  static paramsSchema = paramsSchema

  static get querySchema() {
    const { properties: { title, images, ...properties } } = this
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
  Banner
}