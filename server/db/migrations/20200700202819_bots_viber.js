exports.up = function (knex) {
    return knex.schema
      .createTable('bots_viber', table => {
          table.increments()
          table.integer('city_id').unsigned()
          table.foreign('city_id').references('cities.id')
          table.string('token', 300)
          table.string('subscribe_password', 300)
          table.json('notify_subscribers')
          table.json('extra')
      })
}

exports.down = function (knex) {
    return knex.schema
      .dropTable("bots_viber")
}