import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import { Avatar, Dropdown } from "@nextui-org/react";
import { AuthContext } from "../../../../../Context/AuthContext";
import { UilEllipsisV, UilLocationPoint } from "@iconscout/react-unicons";
const PostPerview = () => {
  const { user } = useContext(AuthContext);
  const [myProfilePictureImage, setMyProfilePictureImage] = useState("");
  // getting user profile picture path
  useEffect(() => {
    if (user) {
      setMyProfilePictureImage(
        `http://localhost:4000/profileImages/${user.profilePicture}`
      );
    }
  }, [user]);
  //
  return (
    <div className="perview-post-wrapper">
      <div className="preview-post-container">
        <div className="top-section">
          <div className="left">
            <div className="profilePicture">
              <Avatar size="lg" src={myProfilePictureImage} />
            </div>
            <div className="user-details">
              <p className="username">{user.username}</p>
              <div className="sub-details">
                <p className="time">20 day ,</p>
                <p className="location">
                  <div className="icon">
                    <UilLocationPoint size={20} />
                  </div>
                  <p>tataouin</p>
                </p>
              </div>
            </div>
          </div>
          <div className="right">
            <Dropdown>
              <Dropdown.Button light>
                <UilEllipsisV />
              </Dropdown.Button>
              <Dropdown.Menu aria-label="Example with disabled actions">
                <Dropdown.Item key="save">Save</Dropdown.Item>
                {/* <Dropdown.Item key="copy"></Dropdown.Item> */}
                {/* <Dropdown.Item key="edit">Edit file</Dropdown.Item> */}
                <Dropdown.Item key="delete" color="error">
                  Hide Post
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPerview;
