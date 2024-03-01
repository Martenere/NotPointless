import { useState } from "react";
import setting from "../../assets/settings.svg";
import user from "../../assets/user.svg";
import "./LeftMenu.css";
import LoginPane from "../LoginPane/LoginPane.jsx";
const pages = ["Points Stored in Database", "Get Random Points", "Recent"];
function LeftMenu({ targetPage, changePage, showLoginPane, setShowLoginPane }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveringCog, setIsHoveringCog] = useState(false);

  return (
    <>
      <div className="Left-Menu">
        <div className={`Left-Menu ${isHovered ? "selectedIsHovered" : ""}`}>
          <div className="Left-Menu-Container d-flex flex-column  align-items-stretch">
            {pages.map((target, index) => {
              return (
                <button
                  key={index}
                  className={
                    "btn btn-lg btn-left-menu m-0 px-4 py-4 btn-" +
                    (targetPage == index ? "primary" : "secondary")
                  }
                  onClick={() => {
                    setIsHovered(true);
                    changePage(index);
                  }}
                  onMouseEnter={() =>
                    targetPage === index && setIsHovered(true)
                  }
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {target}
                </button>
              );
            })}
            <div className="Bottom-Menu d-flex justify-content-between align-items-center">
              <img
                className="px-3 Icon-Color IconRotate"
                src={setting}
                style={{
                  animationPlayState: isHoveringCog ? "running" : "paused",
                }}
                onMouseEnter={() => setIsHoveringCog(true)}
                onMouseLeave={() => setIsHoveringCog(false)}
              ></img>
              <img
                className="px-3 Icon-Color Icon"
                src={user}
                onClick={() => setShowLoginPane(!showLoginPane)}
              ></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LeftMenu;
