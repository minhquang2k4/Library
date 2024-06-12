const User = require("../models/user");
const crypto = require("crypto");
const md5 = require("md5");

module.exports.register = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  if (await User.findOne({ username: username })) {
    res.status(409).json({ message: "Username already exists" });
    return;
  }

  const user = new User({
    username: username,
    email: email,
    password: md5(password),
    token: crypto.randomBytes(64).toString("hex"),
  });

  await user.save();
  res.status(201).json({ message: "User created successfully"});
};

module.exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({
    email: email,
    password: md5(password),
  });
  if (!user) {
    res.json({ error: "Invalid email or password" });
    return;
  }
  res.cookie("token", user.token);
  res.json({ success: true, user: user});
};

