const pg = require("pg");

const db = new pg.Client({
  user : 'postgres',
  host : 'localhost',
  database : 'product',
  password : 'thang01010610',
  port : 5432,
});

db.connect((err) => {
  if (err) {
    console.error('Connection error', err.stack);
    process.exit(1);
  } else {
    console.log('Connected to the database');
  }
});

module.exports = db;