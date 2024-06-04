const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const db = require("./config/database.js");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

db.connect();

app.use(cookieParser());
app.use(require("./router/router.js"));

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});