import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../../../Context/AuthContext";
import "./style.scss";
import { Avatar, Textarea, Button, Input } from "@nextui-org/react";
import { v4 as uuidv4 } from "uuid";
import {
  UilImage,
  UilLocationPoint,
  UilGrin,
  UilTimesCircle,
} from "@iconscout/react-unicons";
import EmojiPicker from "emoji-picker-react";
import { toast } from "react-hot-toast";
const AddPost = () => {
  const { user } = useContext(AuthContext);
  const [myProfilePictureImage, setMyProfilePictureImage] = useState("");
  const textAreaRef = useRef(null);
  const locRef = useRef(null);
  const [postPictures, setPostPictures] = useState([]);
  const [isLocHide, setIsLocHide] = useState(false);
  const [isEmojiHide, setIsEmojiHide] = useState(false);
  const handelSubmit = () => {
    if (textAreaRef.current.value === "" && postPictures.length === 0) {
      console.log("test");
    } else {
      const formData = new FormData();
      formData.append("postContent", textAreaRef.current.value);
      formData.append("location", locRef.current.value);
      formData.append("postOwner", user.username);
      if (postPictures.length > 0) {
        postPictures.forEach((picture) => {
          formData.append("postPictures", picture);
        });
      }

      console.log(Array.from(formData));
      fetch("http://localhost:4000/dot/addPosts", {
        method: "POST",

        body: formData,
      })
        .then((Response) => {
          Response.json();
          if (Response.ok) {
            textAreaRef.current.value = "";
            locRef.current.value = "";
            setPostPictures();
            toast.success("Post added successfully");
          }
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          toast.error("issues posting try later !");
          console.log(err);
        });
    }
  };
  // getting user profile picture path
  useEffect(() => {
    if (user) {
      setMyProfilePictureImage(
        `http://localhost:4000/profileImages/${user.profilePicture}`
      );
    }
  }, [user]);
  return (
    <div className="add-posts-wrapper">
      <section className="top-section">
        <div className="avatar">
          <Avatar
            src={myProfilePictureImage}
            size="md"
            color="success"
            bordered
          />
        </div>
        <div className="textArea">
          <Textarea
            ref={textAreaRef}
            aria-labelledby="textArea-label"
            className="text-input"
            placeholder="Share something ..."
            minRows={2}
            // value={postContent}
            css={{
              color: "$blue800",
              fontSize: "$sm",
              width: "90%",
            }}
          />
        </div>
      </section>
      <section className="divider"></section>
      <section className="picture-view">
        {postPictures &&
          postPictures.map((picture) => {
            return (
              <div className="picture" key={uuidv4()}>
                <div className="overlay"></div>
                <div
                  className="close-icon"
                  onClick={() => {
                    setPostPictures(
                      postPictures.filter((pic) => pic.name !== picture.name)
                    );
                  }}
                >
                  <UilTimesCircle size={18} />
                </div>

                <div className="picture-container">
                  <img src={URL.createObjectURL(picture)} alt="post" />
                </div>
              </div>
            );
          })}
      </section>
      <section className="bottom-section">
        <div className="utils">
          <div className="AvatarContainer">
            <label htmlFor="inputFields">
              <Avatar
                id="inputTag"
                size="sm"
                className="icon"
                icon={<UilImage size={18} />}
              ></Avatar>
            </label>
            <input
              className="inputFields"
              aria-labelledby="inputFields-label"
              id="inputFields"
              multiple
              type="file"
              accept="image/png, image/jpg, image/gif, image/jpeg"
              onChange={(e) => {
                if (e.target.files.length > 6) {
                  toast.error("You can upload only 6 images");
                } else {
                  setPostPictures(Array.from(e.target.files));
                }
              }}
            />

            <div className="location">
              <Avatar
                size="sm"
                className="icon"
                icon={<UilLocationPoint size={18} />}
                onClick={() => {
                  setIsLocHide(!isLocHide);
                  setIsEmojiHide(false);
                }}
              ></Avatar>
              <div className="loc-Input">
                <Input
                  aria-labelledby="location-label"
                  placeholder="  Share location"
                  locinput={isLocHide ? "showlocation" : "hidelocation"}
                  className="locationInput"
                  ref={locRef}
                  // onChange={(e) => {
                  //   setLocation(e.target.value);
                  // }}
                />
              </div>
            </div>
            <div className="emoji">
              <Avatar
                size="sm"
                className="icon emojiIcon"
                icon={<UilGrin size={18} />}
                aria-labelledby="emoji-label"
                onClick={() => {
                  setIsEmojiHide(!isEmojiHide);
                  // setIsLocHide(true);
                }}
              ></Avatar>
              <div className="emoji-selector">
                <div className="emojiPicker">
                  <EmojiPicker
                    height={isEmojiHide ? 290 : 0}
                    width={isEmojiHide ? 270 : 0}
                    searchDisabled={true}
                    previewConfig={{ defaultCaption: "", showPreview: false }}
                    suggestedEmojisMode="none"
                    onEmojiClick={(e, emojiObject) => {
                      textAreaRef.current.value =
                        textAreaRef.current.value + e.emoji;
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="btn-container">
          <Button
            className="btn"
            auto
            onPress={() => {
              handelSubmit();
            }}
          >
            Post
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AddPost;
