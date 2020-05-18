class Entitie {
    static get tableName() {
        return 'entities'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [
                'eType',
                'eTypeTitle',
                'value',
                'extra'
            ],
            properties: {
                id: { type: 'integer' },
                eType: { type: 'string' },
                eTypeTitle: { type: 'string' },
                value: { type: 'string' },
                extra: { type: ['object', 'null'] }
            }
        }
    }
}

module.exports = {
    Entitie
}