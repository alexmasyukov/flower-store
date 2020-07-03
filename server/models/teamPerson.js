const {
  type,
  all,
  minProperties,
  paramsSchema
} = require('../models/common')

class TeamPerson {
  static table = 'team'

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
    const { properties } = this
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

  static paramsSchema = paramsSchema

  static get querySchema() {
    const { properties: { extra, ...properties } } = this
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
  TeamPerson
}