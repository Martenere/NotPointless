import "./MainView.css";
import { useState } from "react";
import setting from "../assets/settings.svg";
import user from "../assets/user.svg";

const pages = ["Main", "Hub", "Recent"];
function MainView() {
  const [targetPage, setTargetPage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveringCog, setIsHoveringCog] = useState(false);
  const [apiData, setApiData] = useState([]);

  const changePage = (page) => {
    setTargetPage(page);
  };

  function getData() {
    let data;
    fetch("https://localhost:5001/points/12Randompoint")
      .then((response) => {
        // Check if the response was ok (status in the range 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((parsedJson) => {
        console.log("Data", parsedJson);
        data = parsedJson;
        setApiData(data);
      })
      .catch((error) => {
        console.error("Fetch error: " + error.message);
      });
  }
  console.log("Current Api data", apiData);
  return (
    <div className="Main-View">
      <div className="Left-Menu">
        <div className={`Left-Menu ${isHovered ? "selectedIsHovered" : ""}`}>
          <div className="Left-Menu-Container d-flex flex-column  align-items-stretch">
            {pages.map((target, index) => {
              return (
                <button
                  key={index}
                  className={
                    "btn btn-lg m-0 px-4 py-4 btn-" +
                    (targetPage == index ? "primary" : "secondary")
                  }
                  onClick={() => {
                    getData();
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
              <img className="px-3 Icon-Color Icon" src={user}></img>
            </div>
          </div>
        </div>
      </div>
      <div className="Body-Panel">
        {apiData.map((point, index) => {
          // Assuming the maximum x and y values are 10, adjust if different
          // Convert point.x and point.y to a percentage of the container size
          const leftPercentage = point.x;
          const bottomPercentage = point.y;

          return (
            <div
              key={index}
              className="Dot"
              style={{
                left: `${leftPercentage}%`,
                bottom: `${bottomPercentage}%`,
                transform: "translate(-50%, 50%)", // Adjust dot position to center it based on its own size
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default MainView;
