class Entitie {
  static table = 'entities'

  static type = 'object'
  static minProperties = 1
  static properties = {
    eType: { type: 'string' },
    eTypeTitle: { type: 'string' },
    value: { type: 'string' },
    extra: { type: ['object', 'null'] }
  }

  static get bodySchema() {
    const { type, properties, minProperties } = this
    return {
      type,
      minProperties,
      required: [
        'eType',
        'eTypeTitle',
        'value',
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
    const { type, properties } = this
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
  Entitie
}