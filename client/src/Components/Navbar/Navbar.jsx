import "./Navbar.css";
import WorkoutLogo from "../../assets/workout-list-svgrepo-com.svg";
import ExerciseLogo from "../../assets/workout-svgrepo-com.svg";
import BiometricsLogo from "../../assets/health-svgrepo-com.svg";
import SettingsLogo from "../../assets/settings-svgrepo-com.svg";
import LogLogo from "../../assets/calendar-days-svgrepo-com.svg";
import SleepTrackerLogo from "../../assets/bed-svgrepo-com.svg";
import DietTrackerLogo from "../../assets/food-dish-svgrepo-com.svg";
import TrainerLogo from "../../assets/muscle-up-svgrepo-com.svg";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../Managers/UserManager";
import { House, HouseFill } from "react-bootstrap-icons";
export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div>
        <Link to="/">
          <HouseFill type="button" className="btn btn-primary">
            
          </HouseFill>
        </Link>
        <Link to="jym">
          <button type="button" className="btn btn-primary">
            <div>
              <img className="navbarLogo" src={TrainerLogo}></img>
              Jym
            </div>
          </button>
        </Link>
        <Link to="workouts">
          <button type="button" className="btn btn-primary">
            <div>
              <img className="navbarLogo" src={WorkoutLogo}></img>
              Workouts
            </div>
          </button>
        </Link>
        <Link to="exercises">
          <button type="button" className="btn btn-primary">
            <div>
              <img className="navbarLogo" src={ExerciseLogo}></img>
              Exercises
            </div>
          </button>
        </Link>
        {/* <Link to="progress">
        <button type="button" className="btn btn-primary">
          <img className="navbarLogo" src={LogLogo}></img>
          Log
        </button>
        </Link> */}
        {/* <button type="button" className="btn btn-primary">
          <img className="navbarLogo" src={SleepTrackerLogo}></img>
          Sleep
        </button>
        <button type="button" className="btn btn-primary">
          <img className="navbarLogo" src={DietTrackerLogo}></img>
          Diet
        </button> */}
        <Link to="userprofile">
          <button type="button" className="btn btn-primary">
            <img className="navbarLogo" src={BiometricsLogo}></img>
            Profile
          </button>
        </Link>
        <button type="button" className="btn btn-primary">
          <img className="navbarLogo" src={SettingsLogo}></img>
          Settings
        </button>
        <button type="button" className="btn btn-primary">
          <a
            onClick={() => {
              logout();
              navigate("/");
              window.location.reload();
            }}
          >
            Logout
          </a>
        </button>
      </div>
    </div>
  );
};
