const {
  type,
  all,
  minProperties,
  paramsSchema
} = require('../models/common')

class Customer {
  static table = 'customers'

  static properties = {
    city_id: { type: 'integer' },
    phone: { type: 'string' },
    name: { type: 'string' },
    points: { type: 'integer' },
    last_sms_code: { type: 'string' },
    extra: { type: "object" }
  }

  static get bodySchema() {
    const { properties } = this
    return {
      type,
      minProperties,
      required: [
        'city_id',
        'phone',
        'name',
        'points'
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

  static get confimJsonSchema() {
    return {
      type,
      minProperties,
      required: [
        'phone',
        'name'
      ],
      properties: {
        phone: { type: 'integer' },
        name: { type: 'string' },
        sms_code: { type: 'integer' }
      }
    }
  }
}

module.exports = {
  Customer
}