import { useEffect, useState } from "react";
import { GetWorkoutsByUserId } from "../../Managers/WorkoutManager";
import { Accordion, AccordionItem } from "react-bootstrap";

export const Workouts = ({ currentUser }) => {
  const [workouts, setWorkouts] = useState([]);
  const user = localStorage.getItem("FitnessAppUser")
  console.log(currentUser)

  const getWorkouts = () => {
    GetWorkoutsByUserId(currentUser.id).then((data) => setWorkouts(data));
  };

  useEffect(() => {
    getWorkouts();
  }, [currentUser]);

  return (
    <div>
      <Accordion defaultActiveKey="0">
        {workouts.map((workout) => {
            return(
                <Accordion.Item eventKey={workout.id}>
                    <Accordion.Header>{workout.name}</Accordion.Header>
                    <Accordion.Body>WORKOUT INFORMATION</Accordion.Body>
                </Accordion.Item>
            )
        })}
        
      </Accordion>
    </div>
  );
};
