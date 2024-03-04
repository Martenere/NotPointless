import { createContext, useState } from "react";

import "./App.css";
import MainView from "./Components/MainView";
export const UserContext = createContext();

const jwtTokenInStorage = localStorage.getItem("JwtToken");

function App() {
  const [jwtBearerToken, setJwtBearerToken] = useState(
    jwtTokenInStorage ? jwtTokenInStorage : ""
  );

  function processJwtBearerToken(token) {
    setJwtBearerToken(token);
    localStorage.setItem("JwtToken", token);
  }
  return (
    <>
      <UserContext.Provider
        value={{
          username: "",
          loggedIn: false,
          jwtBearerToken: jwtBearerToken,
          processJwtBearerToken: processJwtBearerToken,
        }}
      >
        <MainView />
      </UserContext.Provider>
    </>
  );
}

export default App;
