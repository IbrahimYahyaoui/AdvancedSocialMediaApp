const posts = require("../models/PostModel");
const USER = require("../models/USER");

const addPost = async (req, res) => {
  const { postContent, location, postPictures, postOwner } = req.body;
  let files = req.files;
  let fileNameArray = [];
  for (let i = 0; i < files.length; i++) {
    fileNameArray.push(files[i].filename);
  }
  console.log(fileNameArray);
  try {
    const user = await USER.findOne({ username: postOwner });

    const post = await posts.create({
      postOwner,
      postContent,
      location,
      postPictures: fileNameArray,
    });

    // update user posts list
    await USER.updateOne(
      { _id: user._id },
      { $push: { postsListee: post._id } }
    );
    res.status(200).send({ post });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
module.exports = {
  addPost,
};
