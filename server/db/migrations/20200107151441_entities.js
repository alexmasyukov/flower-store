exports.up = function (knex) {
   return knex.schema
      .createTable('entities', table => {
         table.increments().primary()
         table.string('eType').notNullable()
         table.string('eTypeTitle').notNullable()
         table.string('value').notNullable()
         table.json('extra')
      })
}

exports.down = function (knex) {
   return knex.schema
      .dropTable("entities")
}