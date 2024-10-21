import { useState } from "react";
import { ArrowLeft, PlusSquare } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Tooltip,
} from "reactstrap";
import { WorkoutInProgress } from "./WorkoutInProgress";

export const WorkoutFreestyle = () => {
  const [toolTipOpen4, setToolTipOpen4] = useState(false);
  const toggle4 = () => setToolTipOpen4(!toolTipOpen4);
  const [exitModal, setExitModal] = useState(false);
  const toggleExit = () => setExitModal(!exitModal);
  const navigate = useNavigate();
  return (
    <div className="coreComponent">
      <div className="backButton">
        <ArrowLeft size={30} onClick={toggleExit} />
      </div>
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
          Add Exercise
        </Tooltip>
      </div>
      freestyle
      <WorkoutInProgress></WorkoutInProgress>
      <Modal isOpen={exitModal} toggle={toggleExit}>
        <ModalHeader toggle={toggleExit}>
          Are you sure you want to leave?
        </ModalHeader>
        <ModalBody>
          Your progress will not be saved and you will have to restart your
          workout.
          <br />
          <br />
          Click "Leave" to return to workouts or "Cancel" to stay here.
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => navigate("/workouts")}>
            Leave
          </Button>{" "}
          <Button color="secondary" onClick={toggleExit}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <button className="exerciseButton" type="submit">
        Finish Workout
      </button>
    </div>
  );
};
