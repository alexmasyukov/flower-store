exports.seed = function(knex) {
    return knex('products')
      .del()
      .then(function() {
          return knex('products').insert([
              {
                  id: 1,
                  city_id: 1,
                  public: true,
                  order: 1,
                  slug: 'product0',
                  title: 'Сборный в коробке',
                  description: '',
                  florist_id: 1,
                  florist_text: 'Брысь! Кондукторшу не поразила суть дела, что кот лезет в трамвай, в чем было бы еще полбеды, а то, что он собирается платить!',
                  color: 4,
                  stability: 10,
                  shade: 12,
                  packing: 23,
                  bouquetType: 28,
                  additionalProducts: [1, 2, 3]
                  // collection: [24, 27],
                  // available: knex.fn.now(),
                  // grass: true,
                  // cashback: 1,
                  // velvet_hat_box: true
              },
              {
                  id: 2,
                  city_id: 1,
                  public: true,
                  order: 1,
                  slug: 'product1',
                  title: 'Гортензия',
                  description: '',
                  florist_id: 2,
                  florist_text: 'Котам нельзя! С котами нельзя! Брысь! Кондукторшу не поразила суть дела, что кот лезет в трамвай, в чем было бы еще полбеды, а то, что он собирается платить!',
                  color: 3,
                  stability: 11,
                  shade: 14,
                  packing: 23,
                  bouquetType: 29,
                  additionalProducts: [2]
              }
          ])
      })
}

exports.config = { transaction: true }