import { useState } from "react";
import AddPointModal from "../AddPointModal/AddPointModal";
import "./ContentPanel.css";
import Point from "../Point/Point";
function ContentPanel({ apiData }) {
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
          <AddPointModal setShowAddPointMenu={setShowAddPointMenu} />
        )}
      </div>

      <div className="Content-Panel-Points">
        {apiData.map((point, index) => {
          return <Point key={index} point={point} />;
        })}
      </div>
    </div>
  );
}

export default ContentPanel;
