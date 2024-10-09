import { useNavigate } from "react-router-dom"

export const Home = ({currentUser}) => {
    const navigate = useNavigate();
    return(
        <div className="coreComponent">
            <div>

            Welcome <b>{currentUser.username}</b>,
            <br></br>
            would you like to begin workout?
            </div>
            <button className="exerciseButton" onClick={(event) => {
                navigate('/workouts')
            }}>Begin Workout</button>
        </div>
    )
}