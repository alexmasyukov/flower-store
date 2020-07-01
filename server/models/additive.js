class Additive {
  static table = 'additives'

  static type = 'object'
  static minProperties = 1
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
    const { type, properties, minProperties } = this
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
    const { type, properties: { data, ...properties } } = this
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
      properties
    }
  }
}

module.exports = {
  Additive
}