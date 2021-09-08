import mysql from "mysql";
import { promisify } from "util";

// defining the MySQL connection
export const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "quickpay",
});

connection.connect(function (err) {
  if (err) throw err;

  console.log("Database connected!");
});

export const createTables = () => {
  connection.query(`CREATE TABLE IF NOT EXISTS Accounts (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL)`);
};

export const queryPromise = promisify(connection.query.bind(connection));

