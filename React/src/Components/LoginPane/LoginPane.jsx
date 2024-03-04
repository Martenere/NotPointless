import { useState } from "react";
import "./LoginPane.css";
import api from "./LoginAPI";
const loginFormEmpty = {
  name: "",
  password: "",
};

function LoginPane(props) {
  const { setJwtBearerToken, setShowLoginPane } = props;
  const [formState, setFormState] = useState(loginFormEmpty);
  const closeLoginWindow = () => {
    setShowLoginPane(false);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormState({ ...formState, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formState);
    api.sendLoginRequest(formState.name, formState.password).then(
      (registerResult) => console.log(registerResult),
      (error) => console.log("Threw error: ", error)
    );
  };

  return (
    <>
      <div className="overlay" onClick={closeLoginWindow}></div>
      <form onSubmit={handleSubmit}>
        <div className="Modal-Login Login-Pane">
          <div className="login-pane-nav">
            <h1 className="h3-color mx-3 p-4">Login</h1>
          </div>
          <div className="d-flex justify-content-center flex-column">
            <label className="d-flex justify-content-center align-items-center flex-column">
              <h2 className="mx-3">Name</h2>
              <input
                type="text"
                className="Modal-Input Login-Input"
                name="name"
                onChange={handleChange}
                value={formState.name}
              />
            </label>
            <label className="d-flex justify-content-center align-items-center flex-column">
              <h2 className="mx-3">Password</h2>
              <input
                type="text"
                name="password"
                className="Modal-Input Login-Input"
                onChange={handleChange}
                value={formState.password}
              />
            </label>
          </div>{" "}
          <div className="d-flex justify-content-between mx-5 ">
            <button className="btn btn-primary mx-5">Login</button>
            <button
              className="btn btn-secondary mx-5"
              onClick={closeLoginWindow}
            >
              Close
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
export default LoginPane;
