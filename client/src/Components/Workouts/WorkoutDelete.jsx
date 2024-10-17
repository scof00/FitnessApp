import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteWorkout, GetWorkoutById } from "../../Managers/WorkoutManager";
import {
  DeleteByWorkoutId,
  getExerciseByWorkoutId,
} from "../../Managers/WorkoutExerciseManager";

export const WorkoutDelete = () => {
  const [workout, setWorkout] = useState({});
  const [workoutExercises, setWorkoutExercises] = useState([]);
  const { workoutId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    GetWorkoutById(workoutId).then((data) => setWorkout(data));
  }, []);

  useEffect(() => {
    getExerciseByWorkoutId(workoutId).then((data) => setWorkoutExercises(data));
  }, []);

  const handleDelete = () => {
    DeleteByWorkoutId(workoutId).then(
      DeleteWorkout(workoutId).then(navigate("/workouts"))
    );
  };
  return (
    <>
      <div className="exerciseDeleteForm, coreComponent">
        Are you sure you want to delete:
        <p>
          <b>{workout.name}</b>?
        </p>
        <p>
          You will not be able to recover the workout after it's deleted. Your
          exercises will remain untouched.
        </p>
        <button
          onClick={() => handleDelete()}
          type="submit"
          className="btn mt-4 btn-danger mx-1 text-white"
        >
          Delete
        </button>
        <button
          onClick={() => navigate("/workouts")}
          className="btn mt-4 btn-outline-primary mx-1 text-primary"
        >
          Cancel
        </button>
      </div>
    </>
  );
};
