exports.up = function (knex) {
    return knex.schema
      .createTable('additives', table => {
          table.increments()
          table.integer('city_id').unsigned()
          table.foreign('city_id').references('cities.id')
          table.boolean('public')
          table.integer('order')
          table.string('title')
          table.json('data')
      })
}

exports.down = function (knex) {
    return knex.schema
      .dropTable("additives")
}