import "./AddPointModal.css";

function AddPointModal({ setShowAddPointMenu }) {
  function handleSubmit() {
    const xValue = document.getElementById("xValue").value;
    const yValue = document.getElementById("yValue").value;
    // Submit values
    console.log(xValue, yValue);
    PostNumberToApi(xValue, yValue);
    // Close the menu
    setShowAddPointMenu(false);
  }
  function PostNumberToApi(X, Y) {
    const pointPayload = { x: X, y: Y };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pointPayload),
    };
    const url = "https://localhost:5001/points";
    try {
      fetch(url, options)
        .then((response) => {
          if (!response.ok) {
            console.log(
              "Error when posting point to Api:",
              response.statusText
            );
          } else {
            return response.json();
          }
        })
        .then((data) => console.log(data));
    } catch (error) {
      console.error("Fetch Error", error);
    }
  }
  return (
    <div className="Modal AddPointMenu">
      <div>
        <label>
          X:
          <input className="Modal-Input" type="number" id="xValue" />
        </label>
      </div>
      <div>
        <label>
          Y:
          <input className="Modal-Input" type="number" id="yValue" />
        </label>
      </div>
      <button className="btn btn-primary" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default AddPointModal;
