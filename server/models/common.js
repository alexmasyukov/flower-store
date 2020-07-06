const all = { type: 'boolean' }
const limit = { type: 'integer' }
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
  limit,
  type,
  minProperties,
  paramsSchema
}