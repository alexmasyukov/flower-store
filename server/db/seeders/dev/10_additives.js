exports.seed = function(knex) {
    return knex('additives')
      .del()
      .then(function() {
          return knex('additives').insert([
              {
                  id: 1,
                  city_id: 1,
                  order: 0,
                  public: true,
                  title: 'Добавить зелени?',
                  cart_title: 'Зелень',
                  data: JSON.stringify([
                      {
                          order: 0,
                          button: 'Нет',
                          price: 0,
                          image: 'image'
                      },
                      {
                          order: 1,
                          button: 'Немного',
                          price: 100,
                          image: 'image 2'
                      },
                      {
                          order: 2,
                          button: 'Побольше',
                          price: 300,
                          image: 'image 3'
                      }
                  ])
              },
              {
                  id: 2,
                  city_id: 1,
                  order: 1,
                  public: true,
                  title: 'Коробка для букета',
                  cart_title: 'Коробка',
                  data: JSON.stringify([
                      {
                          order: 0,
                          button: 'Обычная',
                          price: 0,
                          image: 'image'
                      },
                      {
                          order: 1,
                          button: 'Бархатная',
                          price: 1500,
                          image: 'image 1'
                      }
                  ])
              }
          ])
      })
}

exports.config = { transaction: true }