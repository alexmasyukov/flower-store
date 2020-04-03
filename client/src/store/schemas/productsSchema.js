import { schema } from 'normalizr'

const itemEntity = new schema.Entity('items')
export const items = new schema.Array(itemEntity)