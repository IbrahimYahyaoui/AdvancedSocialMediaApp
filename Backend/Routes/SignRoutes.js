const express = require("express");
const multer = require("multer");
const { SignupUser, loginUser } = require("../controller/signController");

const router = express.Router();
// multer configuration
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log(file);
    cb(null, "./uploads/profilePictures");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});
const upload = multer({ storage: fileStorageEngine });

router.post("/signup", upload.single("profilePicture"), SignupUser);
router.post("/signin", loginUser);

module.exports = router;
