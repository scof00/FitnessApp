import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetProgressByExerciseId } from "../../Managers/ProgressManager";
import { GetExerciseById } from "../../Managers/ExerciseManager";

export const ProgressDetails = () => {
  const { exerciseId } = useParams();
  const [progress, setProgress] = useState([]);
  const [exercise, setExercise] = useState({});

  useEffect(() => {
    GetProgressByExerciseId(exerciseId).then((data) => setProgress(data));
  }, []);
  useEffect(() => {
    GetExerciseById(exerciseId).then((data) => setExercise(data));
  }, []);
  return (
    <div className="progressList">
      <h2>{exercise.name}</h2>
      {progress.map((p) => {
        return (
          <div className="progressDisplay">
            <div>
              <p><b>Date:</b> {p.dateCompleted}</p>
            </div>
            <div className="progressChild">
              <p>
                <b>Sets:</b> {p.sets}
              </p>
              <p>
                <b>Reps:</b> {p.reps}
              </p>
            </div>
            <div className="progressChild">
              <p>
                <b>Weight:</b> {p.weight} {p.weightType}
              </p>
            </div>
            <p><b>Notes:</b> {p.notes}</p>
          </div>
        );
      })}
    </div>
  );
};
