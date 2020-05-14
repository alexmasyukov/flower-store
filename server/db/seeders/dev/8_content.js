exports.seed = function(knex) {
    return knex('content')
      .del()
      .then(function() {
          return knex('content').insert([
              {
                  id: 1,
                  city_id: 1,
                  order: 0,
                  public: true,
                  title: 'Доставка',
                  content: '<p>Контент 1</p>'
              },
              {
                  id: 2,
                  city_id: 1,
                  order: 1,
                  public: false,
                  title: 'Как долго сохранять свежесть букета',
                  content: '<p><b>Контент 2</b></p>'
              }
          ])
      })
}

exports.config = { transaction: true }