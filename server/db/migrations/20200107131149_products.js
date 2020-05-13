exports.up = function(knex) {
    return knex.schema
      .createTable('products', table => {
          table.increments()
          table.integer('city_id').unsigned()
          table.foreign('city_id').references('cities.id')
          table.boolean('public')
          table.integer('order')
          table.string('slug', 400).notNullable()
          table.string('title', 200).notNullable()
          table.string('description', 1000)
          table.integer('florist_id').unsigned()
          table.foreign('florist_id').references('team.id')
          table.string('florist_text', 1000)
          table.string('color', 50)
          table.string('stability', 50)
          table.string('shade', 50)
          table.string('packing', 50)
          table.string('bouquetType', 50)
          table.specificType('additionalProducts', 'int[]')
            // table.string('available')
          // table.specificType('collection', 'int[]')
          // Можно ли добавить травы
          // table.boolean('grass').defaultTo(true)
          // Процент кешбека [5, '%'] || [300, 'rub']
          // table.integer('cashback', 6)
          // Сменить шляпную коробку
          // table.boolean('velvet_hat_box').defaultTo(false)
          // table.integer('hat_box_price', 6)
      })
}

exports.down = function(knex) {
    return knex.schema
      .dropTable("products")
}

// exports.config = { transaction: false }
