class Banner {
    static get tableName() {
        return 'banners'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [
                'city_id',
                'title',
                'images'
            ],
            properties: {
                id: { type: 'integer' },
                city_id: { type: 'integer' },
                order: { type: 'integer' },
                public: { type: 'boolean' },
                title: { type: 'string' },
                images: {
                    type: "array",
                    items: { type: 'string' },
                    minItems: 1
                }
            }
        }
    }
}

module.exports = {
    Banner
}