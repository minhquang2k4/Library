const userModel = require("../model/user");
const crypto = require("crypto");
const md5 = require("md5");

module.exports.login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await userModel.findOne({
    username: username,
    password: md5(password),
  });

  if (!user) {
    res.redirect("/login");
    return;
  }

  res.cookie("token", user.token);
  res.redirect("/");
};

module.exports.register = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (await userModel.findOne({ username: username })) {
    res.redirect("/register");
    return;
  }

  const user = new userModel({
    username: username,
    password: md5(password),
    token: crypto.randomBytes(64).toString("hex"),
  });

  await user.save();
  res.redirect("/login");
};
