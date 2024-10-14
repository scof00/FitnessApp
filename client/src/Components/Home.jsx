import { Link, useNavigate } from "react-router-dom";
import TrainerLogo from "../assets/muscle-up-svgrepo-com.svg";
import WorkoutLogo from "../assets/workout-list-svgrepo-com.svg";
import ExerciseLogo from "../assets/workout-svgrepo-com.svg";
import BiometricsLogo from "../assets/health-svgrepo-com.svg";
import DietTrackerLogo from "../assets/food-dish-svgrepo-com.svg";
import { GraphUp } from "react-bootstrap-icons";

export const Home = ({ currentUser }) => {
  const navigate = useNavigate();
  return (
    <div className="coreComponent">
      <div>
        Welcome <b>{currentUser.username}</b>,<br></br>
        would you like to begin workout?
      </div>
      <button
        className="exerciseButton"
        onClick={(event) => {
          navigate("/workouts");
        }}
      >
        Begin Workout
      </button>
      <div className="homeGraphics">
        <div>
          <Link to="/exercises">
            <img className="homepageButton" src={ExerciseLogo}></img>
          </Link>
          <Link to="/workouts">
            <img className="homepageButton" src={WorkoutLogo}></img>
          </Link>
          <img className="homepageButton" src={DietTrackerLogo}></img>
          <Link to="/userprofile">
            <img className="homepageButton" src={BiometricsLogo}></img>
          </Link>
        </div>
        <img className="homepageLogo" src={TrainerLogo}></img>
      </div>
    </div>
  );
};
