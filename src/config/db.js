// src/config/db.js
const mysql = require('mysql2');

// Criamos um pool de conexões (mais eficiente)
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',          // Substitua pelo seu usuário do MySQL Workbench
    password: '',
    database: 'smartcard_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Exportamos o pool utilizando Promises (para usar async/await)
module.exports = pool.promise();