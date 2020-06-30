class Additive {
    static get table() {
        return 'additives'
    }

    static get bodySchema() {
        return {
            type: 'object',
            required: [
                'city_id',
                'order',
                'public',
                'title',
                'cart_title',
                'data'
            ],
            properties: {
                city_id: { type: 'integer' },
                order: { type: 'integer' },
                public: { type: 'boolean' },
                title: { type: 'string' },
                cart_title: { type: 'string' },
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

    static get paramsSchema() {
        return {
            type: 'object',
            required: [
                'id'
            ],
            properties: {
                id: { type: 'integer' }
            }
        }
    }

    static get querySchema() {
        const {
            type,
            properties: {
                extra: _,
                data: __,
                ...properties
            }
        } = this.bodySchema

        return {
            type,
            properties
        }
    }
}

module.exports = {
    Additive
}