const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "host",
  user: "root", // Your MySQL username
  password: "Sumit@1009", // Your MySQL password
  // database: "calculator_db",
});

connection.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
  console.log("Connected to MySQL database.");
});

module.exports = connection;
