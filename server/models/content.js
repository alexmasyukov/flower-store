class Content {
    static get tableName() {
        return 'content'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [
                'city_id',
                'title',
                'content'
            ],
            properties: {
                id: { type: 'integer' },
                city_id: { type: 'integer' },
                order: { type: 'integer' },
                public: { type: 'boolean' },
                title: { type: 'string' },
                content: { type: 'string' }
            }
        }
    }
}

module.exports = {
    Content
}