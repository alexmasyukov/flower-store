exports.up = function (knex) {
   return knex.schema
      .createTable('promo_codes', table => {
         table.increments()
         table.integer('city_id').unsigned()
         table.foreign('city_id').references('cities.id')
         table.boolean('public')
         table.string('code', 100).notNullable()
         table.enu('code_type', ['percent', 'money']).notNullable()
         table.dateTime('start').notNullable()
         table.dateTime('end').notNullable()
         table.integer('counter').defaultTo(0)
      })
}

exports.down = function (knex) {
   return knex.schema
      .dropTable("promo_codes")
}
