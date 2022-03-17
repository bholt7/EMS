const mysql = require('mysql2');
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'Ahayah777',
    database: 'employee_db'
  },
  console.log(`Connected to the movies_db database.`)
);

module.exports = db;
/*const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection(
  process.env.DB_NAME, 
  process.env.DB_USER,
  process.env.DB_PASS, {
  
    host: "localhost",
    port: 3306,
    database: "employee__db"
});

connection.connect((err)=>{
  if(err) throw err;
});

module.exports = connection;*/