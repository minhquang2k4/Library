const express = require("express");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");
const port = 8000;
const db = require("./config/database");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

db.connect();

app.use(cookieParser());
app.use(require("./routers/router.js"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
