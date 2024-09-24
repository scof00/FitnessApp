import { Outlet, Route, Routes, useRoutes } from "react-router-dom";
import { Navbar } from "./Components/Navbar/Navbar";
import { Home } from "./Components/Home";

export default function ApplicationViews() {
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

      </Route>
    </Routes>
  );
}
