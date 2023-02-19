const posts = require("../models/PostModel");
const addPost = async (req, res) => {
  const { postContent, location, postPictures } = req.body;
  let files = req.files;
  let fileNameArray = [];
  for (let i = 0; i < files.length; i++) {
    fileNameArray.push(files[i].filename);
  }
  console.log(fileNameArray);
  try {
    const post = await posts.create({
      postContent,
      location,
      postPictures: fileNameArray,
    });
    res.status(200).send({ postContent, location, postPictures });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
module.exports = {
  addPost,
};
