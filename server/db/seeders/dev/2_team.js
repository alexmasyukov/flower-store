exports.seed = function (knex) {
   return knex('team')
      .del()
      .then(() => {
         return knex('team').insert([
            {
               id: 1,
               city_id: 1,
               public: true,
               order: 1,
               isFlorist: false,
               rule: 'Руководитель',
               name: 'Сергей',
               photo: 'Сергей.jpg',
               instagram: 'https://www.instagram.com/komogorcev_s/'
            },
            {
               id: 2,
               city_id: 1,
               order: 2,
               public: true,
               isFlorist: true,
               rule: 'Флорист',
               name: 'Екатерина',
               photo: 'Катя.jpg',
               instagram: 'https://www.instagram.com/_murashka__/'
            },
            {
               id: 3,
               city_id: 1,
               order: 3,
               public: true,
               isFlorist: true,
               rule: 'Флорист',
               name: 'Ксения',
               photo: 'Ксюша.jpg',
               instagram: 'https://www.instagram.com/ksenia_papsueva/'
            },
            {
               id: 4,
               city_id: 1,
               order: 4,
               public: true,
               isFlorist: true,
               rule: 'Флорист',
               name: 'Лиза',
               photo: 'Лиза.jpg',
               instagram: ''
            },
            {
               id: 5,
               city_id: 1,
               order: 5,
               public: true,
               isFlorist: true,
               rule: 'Флорист',
               name: 'Елена',
               photo: '',
               instagram: ''
            },
            {
               id: 6,
               city_id: 1,
               order: 6,
               public: true,
               isFlorist: true,
               rule: 'Флорист',
               name: 'Алёна',
               photo: '',
               instagram: ''
            },
            {
               id: 7,
               city_id: 1,
               order: 7,
               public: true,
               isFlorist: false,
               rule: 'Курьер',
               name: 'Владимир',
               photo: '',
               instagram: ''
            },
            {
               id: 8,
               city_id: 1,
               order: 8,
               public: true,
               isFlorist: false,
               rule: 'Курьер',
               name: 'Игорь',
               photo: '',
               instagram: ''
            }
         ])
      })
}
