exports.seed = function(knex) {
    return knex('customers')
      .del()
      .then(function() {
          return knex('customers').insert([
              {
                  id: 1,
                  city_id: 1,
                  phone: '79960225657',
                  name: 'Алексей',
                  points: 155,
                  extra: {}
              },
              {
                  id: 2,
                  city_id: 1,
                  phone: '89141401312',
                  name: 'Юрий',
                  points: 0,
                  extra: {}
              }
          ])
      })
}

exports.config = { transaction: true }