class ProductSize {
  static table = 'product_sizes'

  static type = 'object'
  static minProperties = 1
  static properties = {
    id: { type: 'integer' },
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
    const { type, properties, minProperties } = this
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

  static get paramsSchema() {
    const { type } = this
    return {
      type,
      required: [
        'id'
      ],
      properties: {
        id: { type: 'integer' }
      }
    }
  }

  static get querySchema() {
    const {
      type,
      properties: { flowers, flowers_counts, images, ...properties }
    } = this
    return {
      type,
      properties
    }
  }

  static get updateSchema() {
    const { type, properties, minProperties } = this
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