import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Input } from "reactstrap";
import { GetExerciseById } from "../../Managers/ExerciseManager";
import { CreateProgress } from "../../Managers/ProgressManager";
import { ArrowLeftSquare } from "react-bootstrap-icons";

export const ProgressCreate = ({ currentUser }) => {
  const { exerciseId } = useParams();
  const [exercise, setExercise] = useState({});
  const [progress, setProgress] = useState({});
  const navigate = useNavigate();

  useState(() => {
    GetExerciseById(exerciseId).then((data) => setExercise(data));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
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
  };
  return (
    <div className="progressList">
      <div className="backButton">
        <ArrowLeftSquare
          size={30}
          onClick={(event) => {
            navigate(`/progress/details/${exerciseId}`);
          }}
        />
      </div>
      <div>
        Add a progress update for: <b>{exercise.name}</b>
      </div>
      <div className="progressInfo">
        <Input
          className="progressInput"
          required
          type="number"
          placeholder="Sets"
          onChange={(event) => {
            const progressCopy = { ...progress };
            progressCopy.sets = parseInt(event.target.value);
            setProgress(progressCopy);
          }}
        ></Input>
        <Input
          required
          className="progressInput"
          type="number"
          placeholder="Reps"
          onChange={(event) => {
            const progressCopy = { ...progress };
            progressCopy.reps = parseInt(event.target.value);
            setProgress(progressCopy);
          }}
        ></Input>
      </div>
      <div className="progressInfo">
        <Input
          className="progressInput"
          required
          type="number"
          placeholder="Weight"
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
  );
};
