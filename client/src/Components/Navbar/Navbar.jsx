import "./Navbar.css";
import WorkoutLogo from "../../assets/workout-list-svgrepo-com.svg";
import ExerciseLogo from "../../assets/workout-svgrepo-com.svg";
import BiometricsLogo from "../../assets/health-svgrepo-com.svg"
import SettingsLogo from "../../assets/settings-svgrepo-com.svg"
import LogLogo from "../../assets/calendar-days-svgrepo-com.svg"
import SleepTrackerLogo from "../../assets/bed-svgrepo-com.svg"
import DietTrackerLogo from "../../assets/food-dish-svgrepo-com.svg"
import TrainerLogo from "../../assets/muscle-up-svgrepo-com.svg"
export const Navbar = () => {
  return (
    <div className="navbar">
      <div>
        <button type="button" className="btn btn-primary">
          trAIner
        </button>
        <button type="button" className="btn btn-primary">
          <div>
            <img className="navbarLogo" src={TrainerLogo}></img>
            Jym
          </div>
        </button>
        <button type="button" className="btn btn-primary">
          <div>
            <img className="navbarLogo" src={WorkoutLogo}></img>
            Workouts
          </div>
        </button>
        <button type="button" className="btn btn-primary">
          <div>
            <img className="navbarLogo" src={ExerciseLogo}></img>
            Exercises
          </div>
        </button>
        <button type="button" className="btn btn-primary">
        <img className="navbarLogo" src={LogLogo}></img>
          Log
        </button>
        <button type="button" className="btn btn-primary">
        <img className="navbarLogo" src={SleepTrackerLogo}></img>
          Sleep
        </button>
        <button type="button" className="btn btn-primary">
        <img className="navbarLogo" src={DietTrackerLogo}></img>
          Diet
        </button>
        <button type="button" className="btn btn-primary">
          <img className="navbarLogo" src={BiometricsLogo}></img>
          Biometrics
        </button>
        <button type="button" className="btn btn-primary">
        <img className="navbarLogo" src={SettingsLogo}></img>
          Settings
        </button>
      </div>
    </div>
  );
};
