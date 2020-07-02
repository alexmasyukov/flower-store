class Content {
  static table = 'content'

  static type = 'object'
  static minProperties = 1
  static properties = {
    city_id: { type: 'integer' },
    order: { type: 'integer' },
    public: { type: 'boolean' },
    title: { type: 'string' },
    content: { type: 'string' }
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
        'content'
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
    const { type, properties: { content, ...properties } } = this
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
  Content
}