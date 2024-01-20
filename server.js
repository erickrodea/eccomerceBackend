const express = require("express");
const mysql = require("mysql2"); // Use mysql2 instead of mysql
const cors = require("cors");
const port = 3001;
const bodyParser = require("body-parser");

const app = express();
app.use(cors());

const db = mysql.createConnection({
  host: "sql5.freesqldatabase.com",
  database: "sql5678399",
  user: "sql5678399",
  password: "P9bK4Ssa2R",
});
app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  return res.json("from backend side");
});

app.get("/products", (req, res) => {
  let query = `SELECT * FROM products`;
  const sortOrder = req.query.sortOrder;
  const category = req.query.category;
  const id = req.query.id;
  if (sortOrder) {
    query = `SELECT * FROM products ORDER By productPrice ${sortOrder}`;
  } else if (category) {
    query = `SELECT * FROM products WHERE productCategory = "${category}"`;
  } else if (id) {
    query = `SELECT * FROM products WHERE idproducts IN (${id})`;
  }

  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(port, () => {
  console.log(`listening on(http://localhost:${port})`);
});

module.exports = db;
