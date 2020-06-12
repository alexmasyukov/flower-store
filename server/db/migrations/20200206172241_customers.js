exports.up = function(knex) {
    return knex.schema
      .createTable('customers', table => {
          table.increments()
          table.integer('city_id').unsigned()
          table.foreign('city_id').references('cities.id')
          table.string('phone', 100).notNullable()
          table.string('name', 200).notNullable()
          table.integer('points').defaultTo(0)
          table.json('extra')
      })
}

exports.down = function(knex) {
    return knex.schema
      .dropTable("customers")
}
