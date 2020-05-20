exports.up = function (knex) {
   return knex.schema
      .createTable('reviews', table => {
         table.increments()
         table.integer('city_id').unsigned()
         table.foreign('city_id').references('cities.id')
         table.boolean('public').defaultTo(false)
         table.integer('order')
         table.timestamp('created_at').defaultTo(knex.fn.now())
         table.string('name', 200)
         table.string('telegram', 200)
         table.string('instagram', 200)
         table.string('text', 5000).notNullable()
      })
}

exports.down = function (knex) {
   return knex.schema
      .dropTable("reviews")
}

// exports.config = { transaction: false }
