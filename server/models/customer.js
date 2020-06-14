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


    static get confimJsonSchema() {
        return {
            type: 'object',
            required: [
                'phone',
                'name',
            ],
            properties: {
                phone: { type: 'integer' },
                name: { type: 'string' },
                sms_code: { type: 'integer' },
            }
        }
    }
}

module.exports = {
    Customer
}