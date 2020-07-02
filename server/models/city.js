class City {
  static table = 'cities'

  static type = 'object'
  static minProperties = 1
  static properties = {
    public: { type: 'boolean' },
    eng: { type: 'string' },
    rus: { type: 'string' },
    contacts: { type: 'object' },
    extra: { type: 'object' }
  }

  static get bodySchema() {
    const { type, properties, minProperties } = this
    return {
      type,
      minProperties,
      required: [
        'public',
        'eng',
        'rus',
        'contacts',
        'extra'
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
    const { type, properties: { contacts, extra, ...properties } } = this
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
  City
}