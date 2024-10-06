import { useEffect, useState } from "react";
import { GetWorkoutsByUserId } from "../../Managers/WorkoutManager";
import { Accordion, AccordionItem } from "react-bootstrap";
import "./Workout.css";
import { Link } from "react-router-dom";
import { getExerciseByWorkoutId, getWorkoutExercise } from "../../Managers/WorkoutExerciseManager";

export const Workouts = ({ currentUser }) => {
  const [workouts, setWorkouts] = useState([]);
  const [workoutExercises, setWorkoutExercises] = useState([]);
  const user = localStorage.getItem("FitnessAppUser");
  console.log(currentUser);

  const getWorkouts = () => {
    GetWorkoutsByUserId(currentUser.id).then((data) => setWorkouts(data));
  };

  useEffect(() => {
    getWorkouts();
  }, [currentUser]);
  useEffect(() => {
    getWorkoutExercise().then((data) => setWorkoutExercises(data))
  }, []);

  return (
    <div>
      <h2>Your Workouts</h2>
      <Accordion defaultActiveKey="0" className="accordion">
        {workouts.map((workout) => {
          return (
            <Accordion.Item eventKey={workout.id} className="accordionItem">
              <Accordion.Header>{workout.name}</Accordion.Header>
              {workoutExercises.map((we) => {
                if(we.workoutId === workout.id) {
                  return(
                    <Accordion.Body>{we.exerciseName}</Accordion.Body>
                  )
                }
              })}
              
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
