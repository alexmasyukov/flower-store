class TeamPerson {
  static get table() {
    return 'team'
  }

  static get bodySchema() {
    return {
      type: 'object',
      required: [
        'city_id',
        'is_florist',
        'rule',
        'name',
        'photo'
      ],
      properties: {
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
    }
  }

  static get paramsSchema() {
    return {
      type: 'object',
      required: [
        'id'
      ],
      properties: {
        id: { type: 'integer' }
      }
    }
  }

  static get querySchema() {
    const {
      type,
      properties: {
        extra: _,
        ...properties
      }
    } = this.bodySchema

    return {
      type,
      properties
    }
  }
}

module.exports = {
  TeamPerson
}