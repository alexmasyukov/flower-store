class OrderModel {
    static get table() {
        return 'orders'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [
                'city_id',
                'customer_id',
                'data',
            ],
            properties: {
                id: { type: 'integer' },
                city_id: { type: 'integer' },
                customer_id: { type: 'integer' },
                data: { type: "object" },
                complete: { type: 'boolean' },
            }
        }
    }
}

module.exports = {
    OrderModel
}