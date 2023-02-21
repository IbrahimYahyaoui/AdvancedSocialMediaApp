const express = require("express");
const multer = require("multer");
const { addPost, getAllPosts } = require("../controller/postsController");

const router = express.Router();
//  // upload post
// multer configuration
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/PostsPicture");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});
const upload = multer({ storage: fileStorageEngine });
router.post("/addPosts", upload.array("postPictures"), addPost);
// Get ALl Posts
router.get("/getPosts", getAllPosts);

module.exports = router;
