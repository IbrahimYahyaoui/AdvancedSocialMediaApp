const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const newPost = Schema({
  postContent: {
    type: String,
  },
  location: {
    type: String,
  },
  postPictures: {
    type: Array,
  },
});

module.exports = mongoose.model("posts", newPost);
