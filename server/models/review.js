class Review {
    static get tableName() {
        return 'reviews'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [
                'city_id',
                'order',
                'public',
                'name',
                'telegram',
                'instagram',
                'text'
            ],
            properties: {
                id: { type: 'integer' },
                city_id: { type: 'integer' },
                order: { type: 'integer' },
                public: { type: 'boolean' },
                name: { type: 'string' },
                telegram: { type: 'string' },
                instagram: { type: 'string' },
                text: { type: 'string' }
            }
        }
    }
}

module.exports = {
    Review
}