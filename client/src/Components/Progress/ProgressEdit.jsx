import { useEffect, useState } from "react";
import { ArrowLeft, ArrowLeftSquare } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router-dom";
import { Input, Label } from "reactstrap";
import {
  GetProgressById,
  updateProgress,
} from "../../Managers/ProgressManager";

export const ProgressEdit = () => {
  const [progress, setProgress] = useState({});
  const { progressId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    GetProgressById(progressId).then((data) => setProgress(data));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
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
  };

  let finalDate = "";
  if (progress.dateCompleted) {
    finalDate = progress.dateCompleted.split("T")[0];
  }

  return (
    <div className="progressList, coreComponent">
      <div>
        <div className="backButton">
          <ArrowLeft
            size={30}
            onClick={(event) => {
              navigate(`/progress/details/${progress.exerciseId}`);
            }}
          />
        </div>
        <div>
          Edit progress entry for: <b>{progress?.exercise?.name}</b> on{" "}
          <b>{finalDate}</b>
        </div>
        <div className="progressInfo">
          <Label>Sets:</Label>
          <Input
            className="progressInput"
            required
            type="number"
            placeholder={progress.sets}
            onChange={(event) => {
              const progressCopy = { ...progress };
              progressCopy.sets = parseInt(event.target.value);
              setProgress(progressCopy);
            }}
          ></Input>
          <Label>Reps</Label>
          <Input
            required
            className="progressInput"
            type="number"
            placeholder={progress.reps}
            onChange={(event) => {
              const progressCopy = { ...progress };
              progressCopy.reps = parseInt(event.target.value);
              setProgress(progressCopy);
            }}
          ></Input>
        </div>
        <div className="progressInfo">
          <Label>Weight</Label>
          <Input
            className="progressInput"
            required
            type="number"
            placeholder={progress.weight}
            onChange={(event) => {
              const progressCopy = { ...progress };
              progressCopy.weight = parseInt(event.target.value);
              setProgress(progressCopy);
            }}
          ></Input>
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
        <Label>Notes:</Label>
        <Input
          className="notesInput"
          placeholder={progress.notes}
          onChange={(event) => {
            const progressCopy = { ...progress };
            progressCopy.notes = event.target.value;
            setProgress(progressCopy);
          }}
        ></Input>
        <Input
          type="date"
          onChange={(event) => {
            const progressCopy = { ...progress };
            progressCopy.dateCompleted = event.target.value;
            setProgress(progressCopy);
          }}
        ></Input>

      <button className="exerciseButton" onClick={handleSubmit}>
        Save
      </button>
    </div>
    </div>
  );
};
