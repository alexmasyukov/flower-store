exports.up = function (knex) {
   return knex.schema
      .createTable('banners', table => {
         table.increments()
         table.integer('city_id').unsigned()
         table.foreign('city_id').references('cities.id')
         table.boolean('public')
         table.integer('order')
         table.string('title', 300).notNullable()
         table.specificType('images', 'text[]')
      })
}

exports.down = function (knex) {
   return knex.schema
      .dropTable("banners")
}