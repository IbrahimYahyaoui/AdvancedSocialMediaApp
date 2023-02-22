require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const signRoute = require("./Routes/SignRoutes");
const addPostRoute = require("./Routes/PostRoute");
const bodyparser = require("body-parser");
var cors = require("cors");

const app = express();
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());
// Route
app.use("/dot", signRoute);
app.use("/dot", addPostRoute);
// Function to serve all static files
// inside public directory.
app.use(express.static("public"));
app.use("/profileImages", express.static("./uploads/profilePictures"));
app.use("/postPicture", express.static("./uploads/PostsPicture"));
// fix db
mongoose.set("strictQuery", false);

// connect to db

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
