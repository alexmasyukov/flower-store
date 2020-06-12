exports.seed = function(knex) {
    return knex('orders')
      .truncate()
      .then(function() {
          return knex('orders').insert([
              {
                  id: 1,
                  city_id: 1,
                  customer_id: 1,
                  complete: false,
                  data: {}
              },
          ])
      })
}

exports.config = { transaction: true }