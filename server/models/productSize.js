class ProductSize {
    static get tableName() {
        return 'product_sizes'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [
                'city_id',
                'order',
                'public',
                'title',
                'diameter',
                'fast',
                'price',
                'flowers',
                'flowers_counts',
                'images'
            ],
            properties: {
                id: { type: 'integer' },
                city_id: { type: 'integer' },
                product_id: { type: 'integer' },
                order: { type: ['integer', 'null'] },
                public: { type: 'boolean' },
                fast: { type: 'boolean' },
                title: { type: 'integer' },
                price: { type: 'integer' },
                diameter: { type: 'integer' },
                flowers: {
                    type: "array",
                    items: { type: 'integer' },
                    minItems: 1
                },
                flowers_counts: {
                    type: "array",
                    items: { type: 'integer' },
                    minItems: 1
                },
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
    ProductSize
}