import { Link, useNavigate } from "react-router-dom";
import TrainerLogo from "../assets/muscle-up-svgrepo-com.svg";
import WorkoutLogo from "../assets/workout-list-svgrepo-com.svg";
import ExerciseLogo from "../assets/workout-svgrepo-com.svg";
import BiometricsLogo from "../assets/health-svgrepo-com.svg";
import DietTrackerLogo from "../assets/food-dish-svgrepo-com.svg";
import { GraphUp } from "react-bootstrap-icons";
import { useState } from "react";
import { Tooltip } from "reactstrap";

export const Home = ({ currentUser }) => {
  const navigate = useNavigate();
  const [toolTipOpen1, setToolTipOpen1] = useState(false);
  const [toolTipOpen2, setToolTipOpen2] = useState(false);
  const [toolTipOpen3, setToolTipOpen3] = useState(false);
  const [toolTipOpen4, setToolTipOpen4] = useState(false);
  const toggle1 = () => setToolTipOpen1(!toolTipOpen1);
  const toggle2 = () => setToolTipOpen2(!toolTipOpen2);
  const toggle3 = () => setToolTipOpen3(!toolTipOpen3);
  const toggle4 = () => setToolTipOpen4(!toolTipOpen4);

  return (
    <div className="coreComponent">
      <h1>trAIner</h1>
      <br></br>
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
            <img
              className="homepageButton"
              id="exerciseTarget"
              src={ExerciseLogo}
            ></img>
            <Tooltip
              isOpen={toolTipOpen1}
              target="exerciseTarget"
              toggle={toggle1}
              placement="top"
            >
              Exercises
            </Tooltip>
          </Link>
          <Link to="/workouts">
            <img
              className="homepageButton"
              id="workoutTarget"
              src={WorkoutLogo}
            ></img>
            <Tooltip
              isOpen={toolTipOpen2}
              target="workoutTarget"
              toggle={toggle2}
              placement="top"
            >
              Workouts
            </Tooltip>
          </Link>
          {/* <img className="homepageButton" src={DietTrackerLogo}></img> */}
          <Link to="/userprofile">
            <img
              className="homepageButton"
              id="profileTarget"
              src={BiometricsLogo}
            ></img>
            <Tooltip
              isOpen={toolTipOpen3}
              target="profileTarget"
              toggle={toggle3}
              placement="top"
            >
              Profile
            </Tooltip>
          </Link>
        </div>
        <Link to="/jym">
          <img className="homepageLogo" id="jymTarget" src={TrainerLogo}></img>
          <Tooltip
            isOpen={toolTipOpen4}
            target="jymTarget"
            toggle={toggle4}
            placement="left"
          >
            Jym
          </Tooltip>
        </Link>
      </div>
    </div>
  );
};
