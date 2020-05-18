class TeamPerson {
    static get tableName() {
        return 'team'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [
                'city_id',
                'isFlorist',
                'rule',
                'name',
                'photo',
            ],
            properties: {
                id: { type: 'integer' },
                city_id: { type: 'integer' },
                public: { type: 'boolean' },
                order: { type: 'integer' },
                isFlorist: { type: 'boolean' },
                rule: { type: 'string' },
                name: { type: 'string' },
                photo: { type: 'string' },
                instagram: { type: 'string' },
                extra: { type: ['object', 'null'] }
            }
        }
    }
}

module.exports = {
    TeamPerson
}