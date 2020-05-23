class Additive {
    static get tableName() {
        return 'additives'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [
                'city_id',
                'order',
                'public',
                'title',
                'data'
            ],
            properties: {
                id: { type: 'integer' },
                city_id: { type: 'integer' },
                order: { type: 'integer' },
                public: { type: 'boolean' },
                title: { type: 'string' },
                data: {
                    type: "array",
                    items: {
                        type: "object",
                        required: [
                            'order',
                            'button',
                            'price',
                            'image'
                        ],
                        properties: {
                            order: { type: 'integer' },
                            button: { type: 'string' },
                            price: { type: 'integer' },
                            image: { type: 'string' }
                        }
                    }
                }
            }
        }
    }
}

module.exports = {
    Additive
}