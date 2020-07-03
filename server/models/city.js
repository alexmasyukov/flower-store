const {
  type,
  all,
  minProperties,
  paramsSchema
} = require('../models/common')

class City {
  static table = 'cities'

  static properties = {
    public: { type: 'boolean' },
    eng: { type: 'string' },
    rus: { type: 'string' },
    contacts: { type: 'object' },
    extra: { type: 'object' }
  }

  static get bodySchema() {
    const { properties } = this
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

  static paramsSchema = paramsSchema

  static get querySchema() {
    const { properties: { contacts, extra, ...properties } } = this
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
  City
}