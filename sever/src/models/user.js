const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  books: {
    type: [
      {
        type: schema.Types.ObjectId,
        ref: "Book",
      },
    ],
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
