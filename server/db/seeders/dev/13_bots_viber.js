exports.seed = function(knex) {
    return knex('bots_viber')
      .truncate()
      .then(function() {
          return knex('bots_viber').insert([
              {
                  id: 1,
                  city_id: 1,
                  token: '4baa196c5c27dc8e-974b1d2799764d7e-d502a929a64602eb',
                  subscribe_password: 'test1',
                  notify_subscribers: JSON.stringify([
                      {
                          id: '1VUAQU+jN2YPwSWns+nUqw==',
                          name: 'Алексей Масюков'
                      },
                      {
                          id: '1VUAQU+jN2YPwSWns+nUqw==',
                          name: 'Алексей Масюков 2'
                      }
                  ]),
                  extra: {}
              }
          ])
      })
}

exports.config = { transaction: true }