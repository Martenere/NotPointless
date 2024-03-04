import { useState } from "react";
import "./LoginPane.css";
import authApi from "./LoginAPI";
const loginFormEmpty = {
  name: "",
  password: "",
};

function LoginPane(props) {
  // eslint-disable-next-line no-unused-vars
  const { setJwtBearerToken, setShowLoginPane } = props;
  const [formState, setFormState] = useState(loginFormEmpty);
  const [apiResponseErrorData, setApiResponseErrorData] = useState([]);
  const [apiResponseSuccessData, setApiResponseSuccessData] = useState("");

  const closeLoginWindow = () => {
    setShowLoginPane(false);
  };

  const handleFormChange = (event) => {
    const { value, name } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  function clearResponseData() {
    setApiResponseErrorData([]), setApiResponseSuccessData("");
  }

  const createAccount = (event) => {
    event.preventDefault();
    authApi.sendRegisterRequest(formState.name, formState.password).then(
      (registerResult) => {
        clearResponseData();
        if (registerResult.response.status != 201) {
          setApiResponseErrorData(registerResult.data);
        }
        if (registerResult.response.status === 201) {
          setApiResponseSuccessData("Account created!");
        }
      },
      (error) => console.log("Threw error: ", error)
    );
  };

  const login = (event) => {
    event.preventDefault();
    clearResponseData();
    authApi.sendLoginRequest(formState.name, formState.password).then(
      (loginResult) => {
        //if response is not "200 OK"
        if (loginResult.response.status != 200) {
          setApiResponseErrorData(loginResult.data);
        }
        if (loginResult.response.status === 200) {
          console.log("Successful login", loginResult.data);
          setApiResponseSuccessData(loginResult.data.token);
        }
      },
      (error) => console.log("Threw error: ", error)
    );
  };

  return (
    <>
      <div className="overlay" onClick={closeLoginWindow}></div>
      <form onSubmit={login}>
        <div className="center-container">
          <div className="Modal-Login Login-Pane">
            <div className="login-pane-nav">
              <h1 className="h3-color mx-3 p-4">Login</h1>
            </div>
            <div className="d-flex justify-content-center flex-column">
              <label className="d-flex justify-content-center align-items-center flex-column">
                <h2 className="mx-3">Username</h2>
                <input
                  type="text"
                  className="Modal-Input Login-Input"
                  name="name"
                  onChange={handleFormChange}
                  value={formState.name}
                />
              </label>
              <label className="d-flex justify-content-center align-items-center flex-column">
                <h2 className="mx-3">Password</h2>
                <input
                  type="password"
                  name="password"
                  className="Modal-Input Login-Input"
                  onChange={handleFormChange}
                  value={formState.password}
                />
              </label>
            </div>
            <div className="responseError d-flex justify-content-center  align-items-center flex-column">
              {apiResponseErrorData && (
                <>
                  {apiResponseErrorData.map((message, indx) => {
                    return (
                      <p key={indx} className="error-text">
                        {message.description}
                      </p>
                    );
                  })}
                </>
              )}
              {apiResponseSuccessData && (
                <p className="success-text">
                  {apiResponseSuccessData.substring(0, 30)}
                </p>
              )}
            </div>
            <div className="d-flex justify-content-center mx-5 ">
              <button className="btn btn-primary mx-5">Login</button>
              <button
                className="btn btn-secondary mx-5"
                onClick={closeLoginWindow}
              >
                Close
              </button>{" "}
            </div>{" "}
            <button
              className="btn btn-create-account mx-2 my-3"
              onClick={createAccount}
            >
              Create New Account
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
export default LoginPane;
