import React from "react";
import AddPost from "../components/Add_post_form/AddPost";
import "./style.scss";
const MainSection = () => {
  return (
    <div className="Main-section-container">
      <div className="PostsForm">
        <AddPost />
      </div>
    </div>
  );
};

export default MainSection;
