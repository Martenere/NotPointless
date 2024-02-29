import "./LoginPane.css";
function LoginPane() {
  return (
    <div className="Modal-Login Login-Pane ">
      <h1 className="h3-color mx-3 p-4">Login</h1>
      <div className="d-flex justify-content-center flex-column">
        <label className="d-flex justify-content-center align-items-center flex-column">
          <h2 className="mx-3">Name</h2>
          <input type="text" className="Modal-Input Login-Input" />
        </label>
        <label className="d-flex justify-content-center align-items-center flex-column">
          <h2 className="mx-3">Password</h2>
          <input type="text" className="Modal-Input Login-Input" />
        </label>
      </div>
    </div>
  );
}
export default LoginPane;
