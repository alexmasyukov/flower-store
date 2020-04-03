module.exports = {
   development: {
      client: 'postgres',
      useNullAsDefault: true,
      connection: {
         host: process.env.DB_HOST,
         database: process.env.DB_NAME,
         user: process.env.DB_USER,
         password: process.env.DB_PASSWORD,
      },
      migrations: {
         tableName: 'knex_migrations',
         directory: __dirname + '/db/migrations'
      },
      seeds: {
         directory: __dirname + '/db/seeders/dev'
      }
   },

   production: {
      client: 'postgresql',
      connection: {
         host: process.env.DB_HOST,
         database: process.env.DB_NAME,
         user: process.env.DB_USER,
         password: process.env.DB_PASSWORD,
      },
      pool: {
         min: 2,
         max: 10
      },
      migrations: {
         tableName: 'knex_migrations',
         directory: __dirname + '/db/migrations'
      },
      seeds: {
         directory: __dirname + '/db/seeders/dev'
      }
   }
}
