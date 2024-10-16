import { useEffect, useState } from "react";
import { getMuscles } from "../../Managers/MuscleManager";
import { Accordion } from "react-bootstrap";
import { GetExerciseByUserId } from "../../Managers/ExerciseManager";
import { Link, useNavigate } from "react-router-dom";
import { Eye, Pen, PencilSquare, Plus, Trash } from "react-bootstrap-icons";

export const ExercisesForProgress = ({ currentUser }) => {
  const [muscles, setMuscles] = useState([]);
  const [exercises, setExercises] = useState([]);
  const user = currentUser;
  const navigate = useNavigate();

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
                            <Eye size={30} onClick={(event) => {
                                navigate(`details/${e.id}`)
                            }}/>
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
