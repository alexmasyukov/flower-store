exports.up = function (knex) {
   return knex.schema
      .createTable('product_sizes', table => {
         table.increments()
         table.integer('city_id').unsigned()
         table.foreign('city_id').references('cities.id')
         table.integer('product_id').unsigned()
         table.foreign('product_id').references('products.id')
         table.boolean('public')
         table.integer('order')
         table.string('title', 200).notNullable()
         table.integer('price').notNullable()
         table.integer('diameter').notNullable()
         table.specificType('flowers_count', 'int[]')
         table.specificType('images', 'text[]')
      })
}

exports.down = function (knex) {
   return knex.schema
      .dropTable("product_sizes")
}