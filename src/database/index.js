import pgPromise from 'pg-promise';

const pgp = pgPromise();

const db = pgp({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_NAME,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
})

export default db;