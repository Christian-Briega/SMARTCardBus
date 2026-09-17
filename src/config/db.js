const mysql = require('mysql2/promise');
require('dotenv').config(); // Garantia extra de leitura

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',          // Usa 'root' se o .env falhar
    password: process.env.DB_PASSWORD || '',      // Insira sua senha do MySQL aqui se não usar .env
    database: process.env.DB_NAME || 'smartcard_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;