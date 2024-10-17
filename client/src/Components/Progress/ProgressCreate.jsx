import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Input, Label, Tooltip } from "reactstrap";
import { GetExerciseById } from "../../Managers/ExerciseManager";
import { CreateProgress } from "../../Managers/ProgressManager";
import { ArrowLeft, ArrowLeftSquare } from "react-bootstrap-icons";

export const ProgressCreate = ({ currentUser }) => {
  const { exerciseId } = useParams();
  const [exercise, setExercise] = useState({});
  const [progress, setProgress] = useState({ weightType: "" });
  const [toolTipOpen1, setToolTipOpen1] = useState(false);
  const toggle1 = () => setToolTipOpen1(!toolTipOpen1);
  const navigate = useNavigate();

  useState(() => {
    GetExerciseById(exerciseId).then((data) => setExercise(data));
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
        userId: currentUser.id,
        exerciseId: exerciseId,
        reps: progress.reps,
        sets: progress.sets,
        weight: progress.weight,
        notes: progress?.notes,
        weightType: progress.weightType,
        dateCompleted: progress.dateCompleted,
      };
      CreateProgress(newProgress).then(
        navigate(`/progress/details/${exerciseId}`)
      );
    }
  };
  return (
    <form className="progressList, coreComponent" onSubmit={handleSubmit}>
      <div id="validation">Please select weight type.</div>
      <div className="backButton">
        <ArrowLeft
          size={30}
          onClick={(event) => {
            navigate(`/progress/details/${exerciseId}`);
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
        Add a progress update for: <b>{exercise.name}</b>
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
            placeholder="Sets"
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
            placeholder="Reps"
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
            placeholder="Weight"
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
      <Input
        className="notesInput"
        placeholder="Notes"
        onChange={(event) => {
          const progressCopy = { ...progress };
          progressCopy.notes = event.target.value;
          setProgress(progressCopy);
        }}
      ></Input>
      <Input
        type="date"
        required
        onChange={(event) => {
          const progressCopy = { ...progress };
          progressCopy.dateCompleted = event.target.value;
          setProgress(progressCopy);
        }}
      ></Input>

      <button className="exerciseButton" type="submit">
        Save
      </button>
    </form>
  );
};
