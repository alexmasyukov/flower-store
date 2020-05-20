const migrations = {
    migrations: {
        tableName: 'knex_migrations',
        directory: __dirname + '/db/migrations'
    },
    seeds: {
        directory: __dirname + '/db/seeders/dev'
    }
}

module.exports = {
    development: {
        client: 'postgres',
        useNullAsDefault: true,
        connection: {
            host: process.env.DB_HOST_DEV,
            database: process.env.DB_NAME_DEV,
            user: process.env.DB_USER_DEV,
            password: process.env.DB_PASSWORD_DEV,
            port: process.env.DB_PORT_DEV
        },
        ...migrations
    },

    production: {
        client: 'postgres',
        useNullAsDefault: true,
        connection: {
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT
        },
        pool: {
            min: 2,
            max: 10
        },
        ...migrations
    }
}
