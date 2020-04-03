exports.seed = function (knex) {
   return knex('products')
      .del()
      .then(function () {
         return knex('products').insert([
            {
               id: 1,
               city_id: 1,
               public: true,
               order: 1,
               available: knex.fn.now(),
               slug: 'product0',
               title: 'Сборный в коробке',
               description: '',
               stability: 10,
               shade: 12,
               color: 4,
               packing: 23,
               collection: [24, 27],
               flowers: [],
               additionalProducts: [1, 2, 3],
               florist_id: 1,
               florist_text: 'Брысь! Кондукторшу не поразила суть дела, что кот лезет в трамвай, в чем было бы еще полбеды, а то, что он собирается платить!'
               // grass: true,
               // cashback: 1,
               // velvet_hat_box: true
            },
            {
               id: 2,
               city_id: 1,
               public: true,
               order: 3,
               available: '',
               slug: 'product1',
               title: 'Гортензия',
               description: '',
               stability: 11,
               shade: 14,
               color: 3,
               packing: 23,
               collection: [25, 26],
               flowers: [],
               additionalProducts: [2],
               florist_id: 2,
               florist_text: 'Котам нельзя! С котами нельзя! Брысь! Кондукторшу не поразила суть дела, что кот лезет в трамвай, в чем было бы еще полбеды, а то, что он собирается платить!',
            },
            {
               id: 3,
               city_id: 1,
               public: true,
               order: 2,
               available: knex.fn.now(),
               slug: 'product2',
               title: 'Монобукет кустовой розы',
               description: '',
               stability: 9,
               shade: 13,
               color: 4,
               packing: 20,
               collection: [26],
               flowers: [],
               additionalProducts: [1, 2],
               florist_id: 1,
               florist_text: 'По вашему профессиональному мнению как действующего специалиста — представляет ли мистер Сегерс опасность для общества?',
            },
            {
               id: 4,
               city_id: 1,
               public: false,
               order: 4,
               available: knex.fn.now(),
               slug: 'product44',
               title: 'Монобукет',
               description: '',
               stability: 11,
               shade: 14,
               color: 3,
               packing: 22,
               collection: [27],
               flowers: [],
               additionalProducts: [2],
               florist_id: 2,
               florist_text: 'По вашему профессиональному мнению как действующего специалиста — представляет ли мистер Сегерс опасность для общества?',
            }
         ])
      })
}

exports.config = { transaction: true }