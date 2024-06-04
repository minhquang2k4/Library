const express = require("express");
const router = express.Router();
const path = require("path");
const auth = require("../controller/auth.js");
const product = require("../controller/product.js");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../view/index.html"));
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../view/login.html"));
});

router.post("/login", auth.login);

router.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../view/register.html"));
});

router.post("/register", auth.register);

router.get("/product", (req, res) => {
    res.sendFile(path.join(__dirname, "../view/product.html"));
    }
);

router.get("/product/index", product.index);

router.post("/product", product.product);

router.get("/detail/:id", product.detail);


module.exports = router;
