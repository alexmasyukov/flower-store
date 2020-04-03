exports.up = function (knex) {
   return knex.schema
      .createTable('additional_products', table => {
         table.increments()
         table.integer('city_id').unsigned()
         table.foreign('city_id').references('cities.id')
         table.boolean('public').defaultTo(true)
         table.string('title', 200).notNullable()
         table.text('desc').notNullable()
         table.integer('price').notNullable()
         table.string('image').notNullable()
      })
}

exports.down = function (knex) {
   return knex.schema
      .dropTable("additional_products")
}