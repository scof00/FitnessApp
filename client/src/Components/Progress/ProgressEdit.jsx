import { useEffect, useState } from "react";
import { ArrowLeft, ArrowLeftSquare } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router-dom";
import { Input, Label, Tooltip } from "reactstrap";
import {
  GetProgressById,
  updateProgress,
} from "../../Managers/ProgressManager";

export const ProgressEdit = () => {
  const [progress, setProgress] = useState({});
  const { progressId } = useParams();
  const [toolTipOpen1, setToolTipOpen1] = useState(false);
  const toggle1 = () => setToolTipOpen1(!toolTipOpen1);
  const navigate = useNavigate();

  useEffect(() => {
    GetProgressById(progressId).then((data) => setProgress(data));
  }, []);

  const showValidationSnackbar = () => {
    var x = document.getElementById("validation");
    // Add the "show" class to DIV
    x.className = "show";
    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let weightTypeSelected = true;

    if (progress.weightType === "" || progress.weightType === "Weight") {
      weightTypeSelected = false;
    }
    if (weightTypeSelected === false) {
      showValidationSnackbar();
    } else {

      const newProgress = {
        id: progress.id,
        userId: progress.userId,
        exerciseId: progress.exerciseId,
        reps: progress.reps,
        sets: progress.sets,
        weight: progress.weight,
        notes: progress?.notes,
        weightType: progress.weightType,
        dateCompleted: progress.dateCompleted,
      };
      updateProgress(newProgress).then(
        navigate(`/progress/details/${progress.exerciseId}`)
      );
    }
    };
    
  let finalDate = "";
  if (progress.dateCompleted) {
    finalDate = progress.dateCompleted.split("T")[0];
  }

  return (
    <form className="progressList, coreComponent" onSubmit={handleSubmit}>
      <div id="validation">Please select weight type.</div>
      <div>
        <div className="backButton">
          <ArrowLeft
            size={30}
            onClick={(event) => {
              navigate(`/progress/details/${progress.exerciseId}`);
            }}
            id="backTarget"
          />
          <Tooltip
          isOpen={toolTipOpen1}
          target="backTarget"
          toggle={toggle1}
          placement="top"
        >
          Back
        </Tooltip>
        </div>
        <div>
          Edit progress entry for: <b>{progress?.exercise?.name}</b> on{" "}
          <b>{finalDate}</b>
        </div>
        <div className="progressLine">
          <div className="progressInfo">
            <Label className="workoutLabel">Sets:</Label>
            <Input
              className="progressInput"
              required
              min={0}
              max={2000}
              type="number"
              defaultValue={progress.sets}
              onChange={(event) => {
                const progressCopy = { ...progress };
                progressCopy.sets = parseInt(event.target.value);
                setProgress(progressCopy);
              }}
            ></Input>
          </div>
          <div className="progressInfo">
            <Label className="workoutLabel">Repetitions:</Label>
            <Input
              required
              className="progressInput"
              type="number"
              min={0}
              max={2000}
              defaultValue={progress.reps}
              onChange={(event) => {
                const progressCopy = { ...progress };
                progressCopy.reps = parseInt(event.target.value);
                setProgress(progressCopy);
              }}
            ></Input>
          </div>
        </div>
        <div className="progressLine">
          <div className="progressInfo">
            <Label className="workoutLabel">Weight:</Label>
            <Input
              className="progressInput"
              required
              min={0}
              max={2000}
              type="number"
              defaultValue={progress.weight}
              onChange={(event) => {
                const progressCopy = { ...progress };
                progressCopy.weight = parseInt(event.target.value);
                setProgress(progressCopy);
              }}
            ></Input>
          </div>
          <div className="progressInfo">
            <Label className="workoutLabel">Type:</Label>
            <Input
              type="select"
              required
              className="progressInput"
              onChange={(event) => {
                const progressCopy = { ...progress };
                progressCopy.weightType = event.target.value;
                setProgress(progressCopy);
              }}
            >
              <option>Weight</option>
              <option value="lbs">lbs</option>
              <option value="kgs">kgs</option>
            </Input>
          </div>
        </div>
        <Label>Notes:</Label>
        <Input
          className="notesInput"
          defaultValue={progress.notes}
          onChange={(event) => {
            const progressCopy = { ...progress };
            progressCopy.notes = event.target.value;
            setProgress(progressCopy);
          }}
        ></Input>
        <Input
          type="date"
          required
          defaultValue={finalDate}
          onChange={(event) => {
            const progressCopy = { ...progress };
            progressCopy.dateCompleted = event.target.value;
            setProgress(progressCopy);
          }}
        ></Input>

        <button className="exerciseButton" type="submit">
          Save
        </button>
      </div>
    </form>
  );
};
