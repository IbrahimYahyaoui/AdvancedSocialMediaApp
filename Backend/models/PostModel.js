const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const newPost = Schema(
  {
    postOwner: {
      require: true,
      type: String,
    },
    postContent: {
      type: String,
    },
    location: {
      type: String,
    },
    postPictures: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("posts", newPost);
