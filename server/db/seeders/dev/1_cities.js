exports.seed = function (knex) {
   return knex('cities')
      .del()
      .then(function () {
         return knex('cities').insert([
            {
               id: 1,
               public: true,
               eng: 'chita',
               rus: 'Чита',
               contacts: {},
               extra: {}
            },
            {
               id: 2,
               public: true,
               eng: 'moscow',
               rus: 'Москва',
               contacts: {},
               extra: {}
            },
         ])
      })
}

exports.config = { transaction: true }