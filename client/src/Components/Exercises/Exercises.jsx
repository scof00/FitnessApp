import { useEffect, useState } from "react";
import { getMuscles } from "../../Managers/MuscleManager";
import { Accordion } from "react-bootstrap";
import { GetExerciseByUserId } from "../../Managers/ExerciseManager";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  GraphUp,
  Pen,
  PencilSquare,
  PlusSquare,
  Trash,
} from "react-bootstrap-icons";
import { Tooltip } from "reactstrap";

export const Exercises = ({ currentUser }) => {
  const [muscles, setMuscles] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [toolTipOpen1, setToolTipOpen1] = useState(false);
  const [toolTipOpen2, setToolTipOpen2] = useState(false);
  const [toolTipOpen3, setToolTipOpen3] = useState(false);
  const [toolTipOpen4, setToolTipOpen4] = useState(false);
  const toggle1 = () => setToolTipOpen1(!toolTipOpen1);
  const toggle2 = () => setToolTipOpen2(!toolTipOpen2);
  const toggle3 = () => setToolTipOpen3(!toolTipOpen3);
  const toggle4 = () => setToolTipOpen4(!toolTipOpen4);
  const user = currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    getMuscles().then((data) => setMuscles(data));
  }, []);

  useEffect(() => {
    GetExerciseByUserId(currentUser.id).then((data) => setExercises(data));
  }, [user]);

  return (
    <div className="coreComponent">
      <div className="topButtonRight">
        <PlusSquare
          size={30}
          onClick={(event) => {
            navigate(`/exercises/create`);
          }}
          id="addTarget"
        />
        <Tooltip
          isOpen={toolTipOpen4}
          target="addTarget" 
          toggle={toggle4}
          placement="top" 
        >
          Add Exercise
        </Tooltip>
      </div>
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
                          <div className="buttons">
                            <GraphUp
                              className="exerciseIcons"
                              id="graphTarget"
                              size={20}
                              onClick={(event) => {
                                navigate(`/progress/details/${e.id}`);
                              }}
                            />
                            <Tooltip
                              isOpen={toolTipOpen1}
                              target="graphTarget" // Tooltip target matches the Play icon id
                              toggle={toggle1}
                              placement="top" // You can adjust placement as needed
                            >
                              Progress
                            </Tooltip>
                            <PencilSquare
                              className="exerciseIcons"
                              id="editTarget"
                              size={20}
                              onClick={(event) => navigate(`edit/${e.id}`)}
                            />
                            <Tooltip
                              isOpen={toolTipOpen2}
                              target="editTarget" // Tooltip target matches the Play icon id
                              toggle={toggle2}
                              placement="top" // You can adjust placement as needed
                            >
                              Edit
                            </Tooltip>
                            <Trash
                              size={20}
                              id="deleteTarget"
                              className="exerciseIcons"
                              onClick={(event) => navigate(`delete/${e.id}`)}
                            />
                            <Tooltip
                              isOpen={toolTipOpen3}
                              target="deleteTarget" // Tooltip target matches the Play icon id
                              toggle={toggle3}
                              placement="top" // You can adjust placement as needed
                            >
                              Delete
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
