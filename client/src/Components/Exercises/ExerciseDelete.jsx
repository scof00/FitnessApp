import { useEffect, useState } from "react";
import {
  deleteExercise,
  GetExerciseById,
} from "../../Managers/ExerciseManager";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteByExerciseId } from "../../Managers/ProgressManager";
import { DeleteWorkoutExerciseByExerciseId } from "../../Managers/WorkoutExerciseManager";

export const ExerciseDelete = () => {
  const [exercise, setExercise] = useState({});
  const { exerciseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    GetExerciseById(exerciseId).then(setExercise);
  }, []);

  const handleDelete = () => {
    DeleteByExerciseId(exerciseId).then(DeleteWorkoutExerciseByExerciseId(exerciseId)).then(deleteExercise(exerciseId)).then(navigate("/exercises"));
  };
  return (
    <>
      <div className="exerciseDeleteForm, coreComponent">
        Are you sure you want to delete:
        <p>
          <b>{exercise.name}</b>?
        </p>
        <p>You will not be able to recover the exercise or its data after you delete it.</p>
        <button
          onClick={() => handleDelete()}
          type="submit"
          className="btn mt-4 btn-danger mx-1 text-white"
        >
          Delete
        </button>
        <button
          onClick={() => navigate("/exercises")}
          className="btn mt-4 btn-outline-primary mx-1 text-primary"
        >
          Cancel
        </button>
      </div>
    </>
  );
};
