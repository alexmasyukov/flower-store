const knex = require('knex')
const environment = process.env.NODE_ENV
const configurations = require('./knexfile')
const config = configurations[environment]
const connection = knex(config)

module.exports = connection