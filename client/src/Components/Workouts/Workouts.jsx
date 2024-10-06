import { useEffect, useState } from "react";
import { GetWorkoutsByUserId } from "../../Managers/WorkoutManager";
import { Accordion, AccordionItem } from "react-bootstrap";
import "./Workout.css";
import { Link } from "react-router-dom";

export const Workouts = ({ currentUser }) => {
  const [workouts, setWorkouts] = useState([]);
  const user = localStorage.getItem("FitnessAppUser");
  console.log(currentUser);

  const getWorkouts = () => {
    GetWorkoutsByUserId(currentUser.id).then((data) => setWorkouts(data));
  };

  useEffect(() => {
    getWorkouts();
  }, [currentUser]);

  return (
    <div>
      <h2>Your Workouts</h2>
      <Accordion stayOpen defaultActiveKey="0" className="accordion">
        {workouts.map((workout) => {
          return (
            <Accordion.Item eventKey={workout.id} className="accordionItem">
              <Accordion.Header>{workout.name}</Accordion.Header>
              <Accordion.Body>WORKOUT INFORMATION</Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
      <Link to="/workouts/create">
        <button>Create New Workout</button>
      </Link>
    </div>
  );
};
