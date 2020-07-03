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
                // 'available',
                'slug',
                'title',
                'stability',
                'shade',
                'color',
                'packing',
                'bouquetType',
                'florist_id',
                'florist_text',
                'sizes'
            ],
            properties: {
                city_id: { type: 'integer' },
                public: { type: 'boolean' },
                order: { type: ['integer', 'null'] },
                slug: { type: 'string' },
                title: { type: 'string', maxLength: 255 },
                description: { type: 'string', maxLength: 1000 },
                color: { type: 'integer' },
                stability: { type: 'integer' },
                shade: { type: 'integer' },
                packing: { type: 'integer' },
                bouquetType: { type: 'integer' },
                florist_id: { type: 'integer' },
                florist_text: { type: 'string' },
                florist_photo: { type: 'string' },
                florist_name: { type: 'string' },
                sizes: {
                    type: 'array',
                    items: { type: 'object' },
                    minItems: 1
                },
                additives: {
                    type: 'array',
                    items: { type: 'integer' },
                }
                // available: { type: ['string', 'null'] }, //, format: 'date-time'
                // collection: {
                //     type: "array",
                //     items: { type: "integer" },
                //     uniqueItems: true
                // },
                // additionalProducts: {
                //     type: "array",
                //     items: { type: "integer" },
                //     uniqueItems: true
                // },
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