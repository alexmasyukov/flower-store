const knex = require('../db/knex')

// todo Сделать возможный выбор только по указанным id
async function getAllAdditives(pub = true) {
    return await knex.select().from('additives')
      .where({
          public: pub
      })

}

module.exports = {
    getAllAdditives
}