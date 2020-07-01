class TeamPerson {
  static table = 'team'

  static type = 'object'
  static minProperties = 1
  static properties = {
    city_id: { type: 'integer' },
    public: { type: 'boolean' },
    order: { type: 'integer' },
    is_florist: { type: 'boolean' },
    rule: { type: 'string' },
    name: { type: 'string' },
    photo: { type: 'string' },
    instagram: { type: 'string' },
    extra: { type: ['object', 'null'] }
  }

  static get bodySchema() {
    const { type, properties, minProperties } = this
    return {
      type,
      minProperties,
      required: [
        'city_id',
        'is_florist',
        'rule',
        'name',
        'photo'
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
    const { type, properties: { extra, ...properties } } = this
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
  TeamPerson
}