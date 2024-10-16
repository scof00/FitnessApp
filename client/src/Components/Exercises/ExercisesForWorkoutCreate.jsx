import { useEffect, useState } from "react";
import { getMuscles } from "../../Managers/MuscleManager";
import { Accordion } from "react-bootstrap";
import { GetExerciseByUserId } from "../../Managers/ExerciseManager";
import { Link } from "react-router-dom";
import { Pen, PencilSquare, Plus, Trash } from "react-bootstrap-icons";
import { Tooltip } from "reactstrap";

export const ExercisesForUse = ({
  currentUser,
  setWorkoutExercises,
  workoutExercises,
}) => {
  const [muscles, setMuscles] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [toolTipOpen1, setToolTipOpen1] = useState(false);
  const toggle1 = () => setToolTipOpen1(!toolTipOpen1);
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
                            <Plus
                              size={30}
                              id="addTarget"
                              onClick={(event) => {
                                event.stopPropagation();
                                let workoutExercisesCopy = [
                                  ...workoutExercises,
                                ];
                                workoutExercisesCopy.push(parseInt(e.id));
                                setWorkoutExercises(workoutExercisesCopy);
                              }}
                            />
                            <Tooltip
                              isOpen={toolTipOpen1}
                              target="addTarget"
                              toggle={toggle1}
                              placement="top"
                            >
                              Add
                            </Tooltip>
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
