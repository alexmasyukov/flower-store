class Product {
    static get tableName() {
        return 'products'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [
                'city_id',
                'public',
                'order',
                // 'available',
                'slug',
                'title',
                'stability',
                'shade',
                'color',
                'packing',
                'florist_id',
                'florist_text',
                'sizes'
            ],
            properties: {
                id: { type: 'integer' },
                city_id: { type: 'integer' },
                public: { type: 'boolean' },
                order: { type: ['integer', 'null'] },
                // available: { type: ['string', 'null'] }, //, format: 'date-time'
                slug: { type: 'string' },
                title: { type: 'string', maxLength: 255 },
                description: { type: 'string', maxLength: 1000 },
                stability: { type: 'integer' },
                shade: { type: 'integer' },
                color: { type: 'integer' },
                packing: { type: 'integer' },
                // collection: {
                //     type: "array",
                //     items: { type: "integer" },
                //     uniqueItems: true
                // },
                // flowers: {
                //     type: "array",
                //     items: { type: "integer" },
                //     uniqueItems: true
                // },
                // additionalProducts: {
                //     type: "array",
                //     items: { type: "integer" },
                //     uniqueItems: true
                // },
                florist_id: { type: 'integer' },
                florist_text: { type: 'string' },
                florist_photo: { type: 'string' },
                florist_name: { type: 'string' },
                sizes: {
                    type: 'array',
                    items: { type: 'object' },
                    minItems: 1
                }
                //    type: "array",
                //    items: { type: 'integer' },
                //    minItems: 1,
                //    uniqueItems: true
                // },
                // packing: {
                //    type: "array",
                //    items: { type: 'integer' },
                //    minItems: 1,
                //    uniqueItems: true
                // },
                // address: {
                //    type: 'object',
                //    properties: {
                //       street: { type: 'string' },
                //       city: { type: 'string' },
                //       zipCode: { type: 'string' }
                //    }
                // }
            }
        }
    }
}

module.exports = {
    Product
}