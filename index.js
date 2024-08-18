const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const app = express();
const Calculation = require("./calculation");

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sumit@1009",
  database: "calculator_db",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
    return;
  }
  console.log("Connected to MySQL database.");
});

// API route
app.post("/calculate", (req, res) => {
  try {
    const { expression } = req.body;
    const result = Calculation.calculateExpression(expression);

    // Save calculation history
    const query = "INSERT INTO history (expression, result) VALUES (?, ?)";
    db.query(query, [expression, result], (err) => {
      if (err) {
        console.error("Error saving history:", err);
        return res.status(500).json({ error: "Failed to save history." });
      }
      res.json({ result });
    });
  } catch (error) {
    console.error("Calculation error:", error);
    res.status(400).json({ error: "Invalid expression." });
  }
});

// API to get calculation history
app.get("/history", (req, res) => {
  db.query(
    "SELECT * FROM history ORDER BY timestamp DESC LIMIT 50",
    (err, results) => {
      if (err) {
        console.error("Error fetching history:", err);
        return res.status(500).json({ error: "Failed to fetch history." });
      }
      res.json(results);
    }
  );
});

// Start the server
const PORT = 5003;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
