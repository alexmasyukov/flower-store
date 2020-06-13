class BotViber {
    static get table() {
        return 'bots_viber'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [
                'city_id',
                'token',
                'subscribe_password',
                'notify_subscribers',
            ],
            properties: {
                id: { type: 'integer' },
                city_id: { type: 'integer' },
                token: { type: 'string' },
                subscribe_password: { type: 'string' },
                notify_subscribers: {
                    type: "array",
                    items: {
                        type: "object",
                        required: [
                            'id',
                            'name'
                        ],
                        properties: {
                            id: { type: 'string' },
                            name: { type: 'string' }
                        }
                    }
                },
                extra: { type: 'object' }
            }
        }
    }
}

module.exports = {
    BotViber
}