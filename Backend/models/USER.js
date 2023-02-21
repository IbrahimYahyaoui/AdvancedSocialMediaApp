const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    profilePicture: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    postsListee: [],
  },
  { timestamps: true }
);
userSchema.statics.signup = async function ({
  profilePicture,
  username,
  password,
  postsListee,
}) {
  const exists = await this.findOne({ username });

  if (exists) {
    throw Error("Username already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({
    username,
    password: hash,
    profilePicture,
    postsListee,
  });
  console.log("d");
  return user;
};
// static login method
userSchema.statics.login = async function ({ username, password }) {
  const user = await this.findOne({ username });
  if (!user) {
    throw Error("Incorrect username");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
