exports.seed = function(knex) {
    return knex('reviews')
      .del()
      .then(function() {
          return knex('reviews').insert([
              {
                  id: 1,
                  city_id: 1,
                  order: 0,
                  public: true,
                  name: '',
                  telegram: '',
                  instagram: '@viktoriya_aprelkova',
                  text: 'Букет очень красивый! Но не только это главное! А еще и то, что очень ' +
                    'приятно у Вас делать заказы! Все четко, быстро, удобно, без сучка без задоринки👌 Вы молодцы!!!!'
              },
              {
                  id: 2,
                  city_id: 1,
                  order: 0,
                  public: true,
                  name: '',
                  telegram: '',
                  instagram: '@91.84029',
                  text: 'Здравствуйте! Букет получился замечательный, все очень понравилось, ' +
                    'виновница торжества была очень довольна. Спасибо большое. Девочки молодцы, обслуживали хорошо. ' +
                    'Дальнейшего развития и процветания.'
              },
              {
                  id: 3,
                  city_id: 1,
                  order: 0,
                  public: true,
                  name: '',
                  telegram: '',
                  instagram: '@KSENIYA_DUTOVA',
                  text: 'Спасибо огромное за вашу работу! Букет шикарный и так оперативно! ' +
                    'Я в восторге! Порадовали именинницу)'
              }
          ])
      })
}

exports.config = { transaction: true }