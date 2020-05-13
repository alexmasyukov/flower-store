exports.seed = function(knex) {
    return knex('banners')
      .del()
      .then(function() {
          return knex('banners').insert([
              {
                  id: 1,
                  city_id: 1,
                  order: 0,
                  public: true,
                  title: 'Шапка большой',
                  images: ['77b3e780-0313-4201-9053-881ee4bfe1c4.jpeg']
              },
              {
                  id: 2,
                  city_id: 1,
                  order: 1,
                  public: false,
                  title: 'Внизу большой',
                  images: ['55035124-ec0d-4497-81a4-7d4cd01168a1.jpg']
              },
          ])
      })
}

exports.config = { transaction: true }