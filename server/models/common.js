const all = { type: 'boolean' }
const type = 'object'
const minProperties = 1

const paramsSchema = {
  type,
  required: [
    'id'
  ],
  properties: {
    id: { type: 'integer' }
  }
}

module.exports = {
  all,
  type,
  minProperties,
  paramsSchema
}