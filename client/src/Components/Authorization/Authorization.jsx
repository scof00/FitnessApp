import { Navigate, Route, Routes } from "react-router-dom"
import { Login } from "./Login"
import { Register } from "./Register"

export const Authorize = ({setIsLoggedIn}) => {
    return(
        <Routes>
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>}></Route>
            <Route path="*" element={<Navigate to="/login"/>}/>
            <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn}/>} />
        </Routes>
    )
}