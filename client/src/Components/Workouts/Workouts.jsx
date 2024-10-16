import { useEffect, useState } from "react";
import { GetWorkoutsByUserId } from "../../Managers/WorkoutManager";
import { Accordion, AccordionItem } from "react-bootstrap";
import "./Workout.css";
import { Link, useNavigate } from "react-router-dom";
import {
  getExerciseByWorkoutId,
  getWorkoutExercise,
} from "../../Managers/WorkoutExerciseManager";
import {
  ArrowLeft,
  PencilSquare,
  Play,
  PlusSquare,
  Trash,
  X,
} from "react-bootstrap-icons";
import { Tooltip } from "reactstrap";

export const Workouts = ({ currentUser }) => {
  const [workouts, setWorkouts] = useState([]);
  const [workoutExercises, setWorkoutExercises] = useState([]);
  const [toolTipOpen1, setToolTipOpen1] = useState(false);
  const [toolTipOpen2, setToolTipOpen2] = useState(false);
  const [toolTipOpen3, setToolTipOpen3] = useState(false);
  const [toolTipOpen4, setToolTipOpen4] = useState(false);
  const toggle1 = () => setToolTipOpen1(!toolTipOpen1);
  const toggle2 = () => setToolTipOpen2(!toolTipOpen2);
  const toggle3 = () => setToolTipOpen3(!toolTipOpen3);
  const toggle4 = () => setToolTipOpen4(!toolTipOpen4);
  // const [workoutIdOverlay, setWorkoutIdOverlay] = useState();

  const navigate = useNavigate();

  const getWorkouts = () => {
    GetWorkoutsByUserId(currentUser.id).then((data) => setWorkouts(data));
  };

  useEffect(() => {
    getWorkouts();
  }, [currentUser]);
  useEffect(() => {
    getWorkoutExercise().then((data) => setWorkoutExercises(data));
  }, []);

  // code for overlay that I realized I don't need
  // const open = (id) => {
  //   setWorkoutIdOverlay(id);
  //   document.getElementById("overlay").style.width = "85vw";
  //   document.getElementById("overlay").style.height = "100vh";
  // };

  // const close = () => {
  //   document.getElementById("overlay").style.width = "0vw";
  //   document.getElementById("secondaryOverlay").style.width = "0vw";
  // };

  // const openSecondary = () => {
  //   document.getElementById("secondaryOverlay").style.width = "85vw";
  //   document.getElementById("secondaryOverlay").style.height = "40vh";
  // };

  return (
    <div className="coreComponent">
      <div className="topButtonRight">
        <PlusSquare
          size={30}
          onClick={(event) => {
            navigate(`/workouts/create`);
          }}
          id="addTarget"
        />
        <Tooltip
          isOpen={toolTipOpen4}
          target="addTarget" 
          toggle={toggle4}
          placement="top" 
        >
          Add Workout
        </Tooltip>
      </div>
      {/* <div className="overlay" id="overlay">
        <div className="xButton">
          <X size={30} onClick={close} />
        </div>
        <div className="overlay-content">
          Would you like to use recommendations?
          <div>
            <button className="exerciseButton" onClick={openSecondary}>
              Yes
            </button>
            <button
              className="exerciseButton"
              onClick={(event) => {
                event.stopPropagation();
                navigate(`inprogress/${workoutIdOverlay}`);
              }}
            >
              No
            </button>
          </div>
        </div>
        <div className="overlay" id="secondaryOverlay">
          <div className="secondary-overlay-content">secondary</div>
        </div>
      </div> */}
      <h2>Your Workouts</h2>
      <Accordion
        defaultActiveKey="0"
        className="accordion"
        onClick={() => close}
      >
        {workouts.map((workout) => {
          return (
            <Accordion.Item eventKey={workout.id} className="accordionItem">
              <Accordion.Header>{workout.name}</Accordion.Header>
              {workoutExercises.map((we) => {
                if (we.workoutId === workout.id) {
                  return <Accordion.Body>{we.exerciseName}</Accordion.Body>;
                }
              })}
              <Accordion.Body className="holdsOverlay">
                <div className="editAndDelete">
                  <Play
                    size={30}
                    id="toolTipTarget" // Match this ID with Tooltip target
                    onClick={(event) => {
                      event.stopPropagation();
                      navigate(`inprogress/${workout.id}`);
                    }}
                  />
                  <Tooltip
                    isOpen={toolTipOpen1}
                    target="toolTipTarget" // Tooltip target matches the Play icon id
                    toggle={toggle1}
                    placement="top" // You can adjust placement as needed
                  >
                    Start Workout
                  </Tooltip>
                  <div>
                    <PencilSquare
                      size={25}
                      id="workoutEdit"
                      onClick={(event) => {
                        event.stopPropagation();
                        navigate(`edit/${workout.id}`);
                      }}
                    />
                    <Tooltip
                    isOpen={toolTipOpen2}
                    target="workoutEdit" // Tooltip target matches the Play icon id
                    toggle={toggle2}
                    placement="top" // You can adjust placement as needed
                  >
                    Edit
                  </Tooltip>
                    <Trash
                      size={25}
                      onClick={(event) => {
                        event.stopPropagation();
                        navigate(`delete/${workout.id}`);
                      }}
                      id="workoutDelete"
                    />
                    <Tooltip
                    isOpen={toolTipOpen3}
                    target="workoutDelete" // Tooltip target matches the Play icon id
                    toggle={toggle3}
                    placement="top" // You can adjust placement as needed
                  >
                    Delete
                  </Tooltip>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </div>
  );
};
