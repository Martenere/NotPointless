function AddPointModal() {
  function handleSubmit() {
    const xValue = document.getElementById("xValue").value;
    const yValue = document.getElementById("yValue").value;
    // Handle the values, e.g., submitting to an API or adding to a state
    console.log(xValue, yValue);

    // Optionally close the menu
    setShowAddPointMenu(false);
  }
  return (
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
  );
}

export default AddPointModal;
