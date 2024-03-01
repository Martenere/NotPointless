import { useState } from "react";

import "./App.css";
import MainView from "./Components/MainView";

function App() {
  const [jwtBearerToken, setJwtBearerToken] = useState("");
  return (
    <>
      <MainView
        jwtBearerToken={jwtBearerToken}
        setJwtBearerToken={setJwtBearerToken}
      />
    </>
  );
}

export default App;
