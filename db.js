const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'school_user',
  password: 'schoolpass123',
  database: 'school_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = db;
