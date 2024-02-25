import { useState } from "react";

function ContentPanel({ apiData }) {
  function handleSubmit() {
    const xValue = document.getElementById("xValue").value;
    const yValue = document.getElementById("yValue").value;
    // Handle the values, e.g., submitting to an API or adding to a state
    console.log(xValue, yValue);

    // Optionally close the menu
    setShowAddPointMenu(false);
  }

  const [showAddPointMenu, setShowAddPointMenu] = useState(false);
  return (
    <div className="Content-Panel">
      <div className="Button-Row">
        <button
          className="btn btn-primary"
          onClick={() => setShowAddPointMenu(!showAddPointMenu)}
        >
          Add Point
        </button>
        {showAddPointMenu && (
          <div className="AddPointMenu">
            <div>
              <label>
                X: <input type="number" id="xValue" />
              </label>
            </div>
            <div>
              <label>
                Y: <input type="number" id="yValue" />
              </label>
            </div>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        )}
      </div>

      <div className="Content-Panel-Points">
        {apiData.map((point, index) => {
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

export default ContentPanel;
