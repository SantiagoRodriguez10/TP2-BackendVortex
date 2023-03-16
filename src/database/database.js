const mysql = require('mysql');
import config from "../config";

const connection = mysql.createConnection({
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password,
    port: config.port
});

const getConnection = () => {
    return connection;
};

module.exports = {
    getConnection
};

connection.connect((err) => {
    if (err) {
      console.log(err)
      return
    }
    console.log('Database connected')
  })