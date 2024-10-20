import { useEffect, useState } from "react";
import { DeleteWorkout, GetWorkoutsByUserId } from "../../Managers/WorkoutManager";
import { Accordion, AccordionItem } from "react-bootstrap";
import "./Workout.css";
import { Link, useNavigate } from "react-router-dom";
import {
  DeleteByWorkoutId,
  getExerciseByWorkoutId,
  getWorkoutExercise,
} from "../../Managers/WorkoutExerciseManager";
import {
  ArrowLeft,
  PencilSquare,
  Play,
  PlusSquare,
  Trash,
  X,
} from "react-bootstrap-icons";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Tooltip } from "reactstrap";

export const Workouts = ({ currentUser }) => {
  const [workouts, setWorkouts] = useState([]);
  const [workoutExercises, setWorkoutExercises] = useState([]);
  const [toolTipOpen1, setToolTipOpen1] = useState(false);
  const [toolTipOpen2, setToolTipOpen2] = useState(false);
  const [toolTipOpen3, setToolTipOpen3] = useState(false);
  const [toolTipOpen4, setToolTipOpen4] = useState(false);
  const toggle1 = () => setToolTipOpen1(!toolTipOpen1);
  const toggle2 = () => setToolTipOpen2(!toolTipOpen2);
  const toggle3 = () => setToolTipOpen3(!toolTipOpen3);
  const toggle4 = () => setToolTipOpen4(!toolTipOpen4);
  const [modal, setModal] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const toggle = () => setModal(!modal);
  

  const navigate = useNavigate();

  const getWorkouts = () => {
    GetWorkoutsByUserId(currentUser.id).then((data) => setWorkouts(data));
  };

  useEffect(() => {
    getWorkouts();
  }, [currentUser]);
  useEffect(() => {
    getWorkoutExercise().then((data) => setWorkoutExercises(data));
  }, []);

  const handleDeleteClick = (workout) => {
    setSelectedWorkout(workout); // Set the clicked exercise
    setModal(true); // Open the modal
  };

  const handleDelete = (id) => {
    DeleteByWorkoutId(id).then(
      DeleteWorkout(id)).then(toggle).then(setWorkouts(prev => prev.filter(item => item.id !== id)))
  };

  return (
    <div className="coreComponent">
      <div className="topButtonRight">
        <PlusSquare
          size={30}
          onClick={(event) => {
            navigate(`/workouts/create`);
          }}
          id="addTarget"
        />
        <Tooltip
          isOpen={toolTipOpen4}
          target="addTarget" 
          toggle={toggle4}
          placement="top" 
        >
          Add Workout
        </Tooltip>
      </div>
      
      <h2>Your Workouts</h2>
      <Accordion
        defaultActiveKey="0"
        className="accordion"
        onClick={() => close}
      >
        {workouts.map((workout) => {
          return (
            <Accordion.Item eventKey={workout.id} className="accordionItem">
              <Accordion.Header>{workout.name}</Accordion.Header>
              {workoutExercises.map((we) => {
                if (we.workoutId === workout.id) {
                  return <Accordion.Body className="workoutExercises">• {we.exerciseName}</Accordion.Body>;
                }
              })}
              <Accordion.Body className="holdsOverlay">
                <div className="editAndDelete">
                  <Play
                    size={30}
                    id="toolTipTarget" // Match this ID with Tooltip target
                    onClick={(event) => {
                      event.stopPropagation();
                      navigate(`inprogress/${workout.id}`);
                    }}
                  />
                  <Tooltip
                    isOpen={toolTipOpen1}
                    target="toolTipTarget" // Tooltip target matches the Play icon id
                    toggle={toggle1}
                    placement="top" // You can adjust placement as needed
                  >
                    Start Workout
                  </Tooltip>
                  <div>
                    <PencilSquare
                      size={25}
                      id="workoutEdit"
                      onClick={(event) => {
                        event.stopPropagation();
                        navigate(`edit/${workout.id}`);
                      }}
                    />
                    <Tooltip
                    isOpen={toolTipOpen2}
                    target="workoutEdit" // Tooltip target matches the Play icon id
                    toggle={toggle2}
                    placement="top" // You can adjust placement as needed
                  >
                    Edit
                  </Tooltip>
                    <Trash
                      size={25}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleDeleteClick(workout);
                      }}
                      id="workoutDelete"
                    />
                    <Tooltip
                    isOpen={toolTipOpen3}
                    target="workoutDelete" // Tooltip target matches the Play icon id
                    toggle={toggle3}
                    placement="top" // You can adjust placement as needed
                  >
                    Delete
                  </Tooltip>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
      {selectedWorkout && (
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Delete Workout</ModalHeader>
          <ModalBody>
            Are you sure you want to delete: <b>{selectedWorkout.name}</b>?
            <br />
            <br />
            Doing so will remove it permanently. This <b>CANNOT</b> be undone.
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={(e)=> {e.stopPropagation() ; handleDelete(selectedWorkout.id)}}>Delete</Button>{" "}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
};
