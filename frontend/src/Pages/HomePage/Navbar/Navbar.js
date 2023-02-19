import React, { useContext, useEffect, useState } from "react";
import {
  UilEstate,
  UilUsersAlt,
  UilBell,
  UilSignout,
} from "@iconscout/react-unicons";
import { User } from "@nextui-org/react";
import { AuthContext } from "../../../Context/AuthContext";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import "./style.scss";
import { useLogout } from "../../../Hooks/logout";
const Navbar = () => {
  const [myProfilePictureImage, setMyProfilePictureImage] = useState("");

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      setMyProfilePictureImage(
        `http://localhost:4000/profileImages/${user.profilePicture}`
      );
    }
  }, [user]);
  const { logout } = useLogout();
  return (
    <div className="nav-wrapper">
      <nav className="navbar">
        <h2>Dot.</h2>

        <ul className="navbar-list">
          <li>
            <UilEstate />
            <p>HomePage</p>
          </li>
          <li>
            <UilUsersAlt />
            <p>connection</p>
          </li>
          <li>
            <UilBell />
            <p>Notification</p>
          </li>
        </ul>

        <Menu
          menuButton={
            <MenuButton>
              <div className="menu-open">
                <User
                  src={myProfilePictureImage}
                  name={user && user.username}
                  bordered
                />
              </div>
            </MenuButton>
          }
          transition
        >
          <MenuItem
            className="logoutButton"
            onClick={() => {
              logout();
            }}
          >
            <p>Logout</p>

            <UilSignout />
          </MenuItem>
          <MenuItem disabled>DOT 1.0.0</MenuItem>
          {/* <MenuItem>Close Window</MenuItem> */}
        </Menu>
      </nav>
    </div>
  );
};

export default Navbar;
