exports.up = function(knex) {
    return knex.schema.table('products', (table) => {
        table.specificType('additives', 'int[]')
    })
}

exports.down = function(knex) {
    return knex.schema.table('products', (table) => {
        table.dropColumn("additives")
    })
}