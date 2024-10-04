import { Navigate, Route, Routes } from "react-router-dom"
import { Login } from "./Login"

export const Authorize = ({setIsLoggedIn}) => {
    return(
        <Routes>
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>}></Route>
            <Route path="*" element={<Navigate to="/login"/>}/>
        </Routes>
    )
}