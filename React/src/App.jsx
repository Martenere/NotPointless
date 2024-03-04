import { createContext, useState } from "react";

import "./App.css";
import MainView from "./Components/MainView";
export const UserContext = createContext();
function App() {
  const [jwtBearerToken, setJwtBearerToken] = useState("");

  return (
    <>
      <UserContext.Provider
        value={{
          username: "",
          loggedIn: false,
          jwtBearerToken: jwtBearerToken,
          setJwtBearerToken: setJwtBearerToken,
        }}
      >
        <MainView
          jwtBearerToken={jwtBearerToken}
          setJwtBearerToken={setJwtBearerToken}
        />
      </UserContext.Provider>
    </>
  );
}

export default App;
