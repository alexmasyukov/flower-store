class SmsModel {
    static get table() {
        return ''
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [
                'phone',
                'text'
            ],
            properties: {
                phone: { type: 'integer' },
                text: { type: 'string' }
            }
        }
    }
}

module.exports = {
    SmsModel
}