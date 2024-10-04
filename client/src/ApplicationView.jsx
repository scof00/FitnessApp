import { Outlet, Route, Routes, useRoutes } from "react-router-dom";
import { Navbar } from "./Components/Navbar/Navbar";
import { Home } from "./Components/Home";
import { Workouts } from "./Components/Workouts/Workouts";
import { useEffect, useState } from "react";
import { AdminView } from "./AdminView";
import { UserView } from "./UserView";

export default function ApplicationViews() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localUser = localStorage.getItem("FitnessAppUser");
    const userObj = JSON.parse(localUser);
    setCurrentUser(userObj);
  }, []);

  if (currentUser.isAdmin === true) {
    return <AdminView currentUser={currentUser} />;
  } else {
    return <UserView currentUser={currentUser} />;
  }
}
