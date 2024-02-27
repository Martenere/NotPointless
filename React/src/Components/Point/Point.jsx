import { useState } from "react";
import "./Point.css";
import AddPointModal from "../AddPointModal/AddPointModal";
function Point({ point }) {
  const [showEditMenu, setShowEditMenu] = useState(false);

  const handleClick = () => {
    console.log("1");
    setShowEditMenu(!showEditMenu);
  };
  return (
    <>
      <div
        className="Dot"
        style={{
          left: `${point.x}%`,
          bottom: `${point.y}%`,
          transform: "translate(-50%, 50%)", // Adjust dot position to center it based on its own size
        }}
        onClick={handleClick}
      ></div>
      {showEditMenu && <AddPointModal setShowAddPointMenu="setShowEditMenu" />}
    </>
  );
}

export default Point;
