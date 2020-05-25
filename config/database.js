// Import
const mysql = require('mysql');

// Get config
require('dotenv').config();

// Database poool
const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  timezone: 'UTC'
});

module.exports = pool;