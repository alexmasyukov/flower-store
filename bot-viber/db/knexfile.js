const base = {
    client: 'postgres',
    useNullAsDefault: true
}

const connection = {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
}

const migrations = {
    tableName: 'knex_migrations',
    directory: __dirname + process.env.DB_PATH_MIGRATIONS
}

const seeds = {
    directory: __dirname + process.env.DB_PATH_SEEDERS
}

const pool = {
    min: 2,
    max: 10
}

module.exports = {
    development: {
        ...base,
        connection,
        migrations,
        seeds
    },

    production: {
        ...base,
        connection,
        migrations,
        seeds,
        pool
    }
}
