import { Navbar } from "./Components/Navbar/Navbar";
import { Outlet, Route, Routes } from "react-router-dom";
import { Home } from "./Components/Home";
import { Workouts } from "./Components/Workouts/Workouts";

export const AdminView = () => {
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
            <Route index path="/" element={<Home/>} />
            <Route path="workouts" element={<Workouts />} />
    
          </Route>
        </Routes>
      );
}