const table = 'orders'

exports.up = function(knex) {
    return knex.schema
      .createTable(table, t => {
          t.increments()
          t.integer('city_id').unsigned()
          t.foreign('city_id').references('cities.id')
          t.integer('customer_id').unsigned()
          t.foreign('customer_id')
            .references('customers.id')
          t.boolean('complete')
          t.timestamp('created_at').defaultTo(knex.fn.now())
          t.json('data')
      })
}

exports.down = function(knex) {
    return knex.schema
      .dropTable(table)
}