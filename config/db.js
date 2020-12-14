require('dotenv').config();
const mysql = require("mysql2");


const pool = mysql.createPool({
    host: process.env.DB_WRITE_HOST || 'localhost',
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'edl_2020',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
});

// connexion DB
const connectDb = {
    HOST: process.env.DB_WRITE_HOST || 'localhost',
    USER: process.env.DB_USERNAME || 'root',
    PASSWORD: process.env.DB_PASSWORD || '',
    DB: process.env.DB_DATABASE || 'edl_2020',
    dialect: process.env.DATABASE_TYPE || 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

module.exports = { pool, connectDb };

