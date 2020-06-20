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
                'steps',
                'products'
            ],
            properties: {
                id: { type: 'integer' },
                city_id: { type: 'integer' },
                customer_id: { type: 'integer' },
                complete: { type: 'boolean' },
                steps: { type: "object" },
                products: { type: "array" },
            }
        }
    }
}

class OrderCompleteModel {
    static get table() {
        return 'orders'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [
                'id',
                'complete'
            ],
            properties: {
                id: { type: 'integer' },
                complete: { type: 'boolean' }
            }
        }
    }
}

module.exports = {
    OrderCompleteModel,
    OrderModel
}