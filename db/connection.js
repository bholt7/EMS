const mysql = require('mysql2');
require('dotenv').config()

const connection = mysql.createConnection(
  process.env.DB_LIB, 
  process.env.DB_USER,
  process.env.DB_PASS, {
  
    host: "localhost",
    port: 3306,
});

connection.connect((err)=>{
  if(err) throw err;
});

module.exports = connection;