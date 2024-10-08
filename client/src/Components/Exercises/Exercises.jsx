import { useEffect, useState } from "react";
import { getMuscles } from "../../Managers/MuscleManager";
import { Accordion } from "react-bootstrap";
import { GetExerciseByUserId } from "../../Managers/ExerciseManager";
import { Link, useNavigate } from "react-router-dom";
import { Pen, PencilSquare, Trash } from "react-bootstrap-icons";

export const Exercises = ({ currentUser }) => {
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
      <h2>Your Exercises</h2>
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
                            <Link to={`edit/${e.id}`}>
                              <PencilSquare size={25} />
                            </Link>
                            <Link to={`delete/${e.id}`}>
                              <Trash size={25} />
                            </Link>
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
      <Link to="/exercises/create">
        <button className="exerciseButton">Create New Exercise</button>
      </Link>
    </div>
  );
};
