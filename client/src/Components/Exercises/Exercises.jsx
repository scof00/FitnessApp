import { useEffect, useState } from "react";
import { getMuscles } from "../../Managers/MuscleManager";
import { Accordion } from "react-bootstrap";
import { GetExerciseByUserId } from "../../Managers/ExerciseManager";

export const Exercises = ({ currentUser }) => {
  const [muscles, setMuscles] = useState([]);
  const [exercises, setExercises] = useState([]);
  const user = currentUser;

  useEffect(() => {
    getMuscles().then((data) => setMuscles(data));
  }, []);

  useEffect(() => {
    GetExerciseByUserId(currentUser.id).then((data) => setExercises(data));
  }, [user]);

  return (
    <div>
      <Accordion defaultActiveKey="0">
        {muscles.map((m) => {
          return (
            <Accordion.Item eventKey={m.id}>
              <Accordion.Header>{m.name}</Accordion.Header>
              {exercises.map((e) => {
                if(e.muscleId === m.id)
                    return(
                <Accordion.Body>{e.name}</Accordion.Body>
                )
              })}
            </Accordion.Item>
          );
        })}
      </Accordion>
    </div>
  );
};
