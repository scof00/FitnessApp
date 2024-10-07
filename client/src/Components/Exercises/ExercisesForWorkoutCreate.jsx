import { useEffect, useState } from "react";
import { getMuscles } from "../../Managers/MuscleManager";
import { Accordion } from "react-bootstrap";
import { GetExerciseByUserId } from "../../Managers/ExerciseManager";
import { Link } from "react-router-dom";
import { Pen, PencilSquare, Plus, Trash } from "react-bootstrap-icons";

export const ExercisesForUse = ({ currentUser, setWorkoutExercises, workoutExercises }) => {
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
      <Accordion defaultActiveKey="0" className="accordion">
        {muscles.map((m) => {
          return (
            <Accordion.Item eventKey={m.id} className="accordionItem">
              <Accordion.Header>{m.name}</Accordion.Header>
              {exercises.map((e) => {
                if (e.muscleId === m.id)
                  return (
                    <div>
                      <Accordion.Body>
                        <div className="editAndDelete">
                          {e.name}
                          <div>
                            <button onClick={(event) => {
                              event.stopPropagation();
                              let workoutExercisesCopy = [...workoutExercises];
                              workoutExercisesCopy.push(parseInt(e.id));
                              setWorkoutExercises(workoutExercisesCopy)
                            }}><Plus /></button>
                          </div>
                        </div>
                      </Accordion.Body>
                    </div>
                  );
              })}
            </Accordion.Item>
          );
        })}
      </Accordion>
    </div>
  );
};
