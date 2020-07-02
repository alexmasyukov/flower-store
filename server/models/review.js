class Review {
  static table = 'reviews'

  static type = 'object'
  static minProperties = 1
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
    const { type, properties, minProperties } = this
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
    const { type, properties: { text, ...properties } } = this
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
  Review
}