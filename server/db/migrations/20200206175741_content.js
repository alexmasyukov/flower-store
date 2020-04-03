exports.up = function (knex) {
   return knex.schema
      .createTable('content', table => {
         table.increments()
         table.integer('city_id').unsigned()
         table.foreign('city_id').references('cities.id')
         table.boolean('public')
         table.integer('order')
         table.string('title', 300).notNullable()
         table.text('content').notNullable()
         table.timestamps()
      })
}

exports.down = function (knex) {
   return knex.schema
      .dropTable("content")
}