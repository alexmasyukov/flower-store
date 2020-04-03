exports.up = function (knex) {
   return knex.schema
      .createTable('team', table => {
         table.increments()
         table.integer('city_id').unsigned()
         table.foreign('city_id').references('cities.id')
            .onUpdate()
         table.boolean('public')
         table.integer('order')
         table.boolean('isFlorist')
         table.string('rule')
         table.string('name', 400).notNullable()
         table.string('photo').notNullable()
         table.string('instagram')
         table.json('extra')
      })
}

exports.down = function (knex) {
   return knex.schema
      .dropTable("team")
}

