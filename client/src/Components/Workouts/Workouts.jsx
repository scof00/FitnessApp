import { useEffect, useState } from "react";
import { GetWorkoutsByUserId } from "../../Managers/WorkoutManager";
import { Accordion, AccordionItem } from "react-bootstrap";
import "./Workout.css";
import { Link, useNavigate } from "react-router-dom";
import {
  getExerciseByWorkoutId,
  getWorkoutExercise,
} from "../../Managers/WorkoutExerciseManager";
import { PencilSquare, Trash } from "react-bootstrap-icons";

export const Workouts = ({ currentUser }) => {
  const [workouts, setWorkouts] = useState([]);
  const [workoutExercises, setWorkoutExercises] = useState([]);
  const user = localStorage.getItem("FitnessAppUser");
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

  return (
    <div className="coreComponent">
      <h2>Your Workouts</h2>
      <Accordion defaultActiveKey="0" className="accordion">
        {workouts.map((workout) => {
          return (
            <Accordion.Item eventKey={workout.id} className="accordionItem">
              <Accordion.Header>{workout.name}</Accordion.Header>
              {workoutExercises.map((we) => {
                if (we.workoutId === workout.id) {
                  return <Accordion.Body>{we.exerciseName}</Accordion.Body>;
                }
              })}
              <Accordion.Body>
                <div className="editAndDelete">
                  <button className="exerciseButton" onClick={(event) => {
                      event.stopPropagation();
                      navigate(`inprogress/${workout.id}`)
                    }}>Start</button>
                  <div>
                    <PencilSquare size={25} onClick={(event) => {
                      event.stopPropagation();
                      navigate(`edit/${workout.id}`)
                    }}/>
                    <Trash size={25}onClick={(event) => {
                      event.stopPropagation();
                      navigate(`delete/${workout.id}`)
                    }}/>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
      <Link to="/workouts/create">
        <button className="exerciseButton">Create New Workout</button>
      </Link>
    </div>
  );
};
