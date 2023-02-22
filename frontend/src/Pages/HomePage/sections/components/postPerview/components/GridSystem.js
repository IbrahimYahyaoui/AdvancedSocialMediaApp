import React from "react";
import "./style.scss";
const GridSystem = ({ number }) => {
  number = 3;
  let gridClassName = "";
  switch (number) {
    case 1:
      gridClassName = "four";
      break;
    case 2:
      gridClassName = "three";
      break;
    case 3:
      gridClassName = "two";
      break;
    case 4:
      gridClassName = "one";
      break;

    default:
      break;
  }
  return (
    <div className="container-grid">
      <div className={gridClassName}>
        <div
          className="pic1 grid-sharedStyle"
          style={{
            backgroundImage: `url(${"http://localhost:4000/postPicture/1677010612491--main2.jpg"})`,
          }}
        ></div>
        <div
          className="pic2 grid-sharedStyle"
          style={{
            backgroundImage: `url(${"http://localhost:4000/postPicture/1676832809361--74e9c3f5a49fe07a3562886075726458.jpg"})`,
          }}
        ></div>
        <div
          className="pic3 grid-sharedStyle"
          style={{
            backgroundImage: `url(${"http://localhost:4000/postPicture/1676832809361--74e9c3f5a49fe07a3562886075726458.jpg"})`,
          }}
        ></div>
        <div
          className="pic4 grid-sharedStyle"
          style={{
            backgroundImage: `url(${"http://localhost:4000/postPicture/1676832809361--74e9c3f5a49fe07a3562886075726458.jpg"})`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default GridSystem;
