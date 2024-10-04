import { Navbar } from "./Components/Navbar/Navbar";
import { Outlet, Route, Routes } from "react-router-dom";
import { Home } from "./Components/Home";
import { Workouts } from "./Components/Workouts/Workouts";
import { Exercises } from "./Components/Exercises/Exercises";

export const UserView = ({currentUser}) => {
    return (
        <Routes>
          <Route
            path=""
            element={
              <>
                <Navbar />
                <Outlet />
              </>
            }
          >
            <Route index path="/" element={<Home currentUser={currentUser}/>} />
            <Route path="workouts" element={<Workouts currentUser={currentUser}/>} />
            <Route path="exercises" element={<Exercises currentUser={currentUser} />} />
    
          </Route>
        </Routes>
      );
}