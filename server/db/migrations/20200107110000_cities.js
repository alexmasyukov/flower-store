exports.up = function (knex) {
   return knex.schema
      .createTable('cities', table => {
         table.increments()
         table.boolean('public').defaultTo(true)
         table.string('eng', 200).notNullable()
         table.string('rus', 200).notNullable()
         table.json('contacts')
         table.json('extra')
      })
}

exports.down = function (knex) {
   return knex.schema
      .dropTable("cities")
}