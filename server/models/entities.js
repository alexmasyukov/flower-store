const {
  type,
  all,
  minProperties,
  paramsSchema
} = require('../models/common')

class Entitie {
  static table = 'entities'

  static properties = {
    eType: { type: 'string' },
    eTypeTitle: { type: 'string' },
    value: { type: 'string' },
    extra: { type: ['object', 'null'] }
  }

  static get bodySchema() {
    const { properties } = this
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

  static paramsSchema = paramsSchema

  static get querySchema() {
    const { properties } = this
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
      properties
    }
  }
}

module.exports = {
  Entitie
}