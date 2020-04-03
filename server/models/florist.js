const { Model } = require('objection')

class Florist extends Model {
   static tableName = 'florists'
}

module.exports = {
   Florist
}