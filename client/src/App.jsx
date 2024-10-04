import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Router } from "react-router-dom";
import ApplicationViews from "./ApplicationView";
import { Authorize } from "./Components/Authorization/Authorization";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("FitnessAppUser")) {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      {isLoggedIn ? (
        <ApplicationViews
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      ) : (
        <Authorize setIsLoggedIn={setIsLoggedIn} />
      )}
    </BrowserRouter>
  );
}

export default App;
