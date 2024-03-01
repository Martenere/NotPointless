import ContentPanel from "./ContentPanel/ContentPanel";
import LeftMenu from "./LeftMenu/LeftMenu";
import LoginPane from "./LoginPane/LoginPane";
import "./MainView.css";
import { useState } from "react";

// const pages = ["Points Stored in Database", "Get Random Points", "Recent"];
function MainView(props) {
  const { jwtBearerToken, setJwtBearerToken } = props;
  const [targetPage, setTargetPage] = useState(0);
  const [apiData, setApiData] = useState([]);
  const [showLoginPane, setShowLoginPane] = useState(false);

  const changePage = (page) => {
    setTargetPage(page);
    if (page === 0) getStoredPointData();
    if (page === 1) getRandomPointData();
  };

  const getRandomPointData = () =>
    getPointData("https://localhost:5001/points/12Randompoint");
  const getStoredPointData = () =>
    getPointData("https://localhost:5001/points/");

  function getPointData(url) {
    let data;
    fetch(url)
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

  return (
    <>
      {showLoginPane && (
        <LoginPane
          setJwtBearerToken={setJwtBearerToken}
          setShowLoginPane={setShowLoginPane}
        />
      )}
      <div className="Main-View">
        <LeftMenu
          targetPage={targetPage}
          changePage={changePage}
          showLoginPane={showLoginPane}
          setShowLoginPane={setShowLoginPane}
        />

        <ContentPanel apiData={apiData} />
      </div>
    </>
  );
}

export default MainView;
