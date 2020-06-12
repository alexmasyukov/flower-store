class Customer {
    static get tableName() {
        return 'customers'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [
                'city_id',
                'phone',
                'name',
                'points'
            ],
            properties: {
                id: { type: 'integer' },
                city_id: { type: 'integer' },
                phone: { type: 'string' },
                name: { type: 'string' },
                points: { type: 'integer' },
                extra: { type: "object" }
            }
        }
    }
}

module.exports = {
    Customer
}