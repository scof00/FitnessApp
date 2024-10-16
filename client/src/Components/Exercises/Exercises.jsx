import { useEffect, useState } from "react";
import { getMuscles } from "../../Managers/MuscleManager";
import { Accordion } from "react-bootstrap";
import { deleteExercise, GetExerciseByUserId } from "../../Managers/ExerciseManager";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  GraphUp,
  Pen,
  PencilSquare,
  PlusSquare,
  Trash,
} from "react-bootstrap-icons";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Tooltip,
} from "reactstrap";
import { DeleteByExerciseId } from "../../Managers/ProgressManager";
import { DeleteWorkoutExerciseByExerciseId } from "../../Managers/WorkoutExerciseManager";

export const Exercises = ({ currentUser }) => {
  const [muscles, setMuscles] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [toolTipOpen1, setToolTipOpen1] = useState(false);
  const [toolTipOpen2, setToolTipOpen2] = useState(false);
  const [toolTipOpen3, setToolTipOpen3] = useState(false);
  const [toolTipOpen4, setToolTipOpen4] = useState(false);
  const user = currentUser;
  const toggle1 = () => setToolTipOpen1(!toolTipOpen1);
  const toggle2 = () => setToolTipOpen2(!toolTipOpen2);
  const toggle3 = () => setToolTipOpen3(!toolTipOpen3);
  const toggle4 = () => setToolTipOpen4(!toolTipOpen4);
  const navigate = useNavigate();
  const toggle = () => setModal(!modal);

  useEffect(() => {
    getMuscles().then((data) => setMuscles(data));
  }, []);
  const settingExercises = () => {
    
    useEffect(() => {
      GetExerciseByUserId(currentUser.id).then((data) => setExercises(data));
    }, []);
  }
  settingExercises();

  const handleDeleteClick = (exercise) => {
    setSelectedExercise(exercise); // Set the clicked exercise
    setModal(true); // Open the modal
  };

  const handleDelete = (id) => {
    DeleteByExerciseId(id).then(DeleteWorkoutExerciseByExerciseId(id)).then(deleteExercise(id)).then(toggle).then(setExercises(prev => prev.filter(item => item.id !== id)));
  }

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
                              onClick={() => handleDeleteClick(e)}
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
      {selectedExercise && (
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Delete Exercise</ModalHeader>
          <ModalBody>
            Are you sure you want to delete: <b>{selectedExercise.name}</b>?
            <br />
            Doing so will remove it from all workout playlists and delete your
            progress forever. This <b>CANNOT</b> be undone.
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={(e)=> {e.stopPropagation() ; handleDelete(selectedExercise.id)}}>Delete</Button>{" "}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
};
