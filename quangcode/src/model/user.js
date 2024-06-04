const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const product = require("./product.js");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  product: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: product,
      },
    ],
  },
  token: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
