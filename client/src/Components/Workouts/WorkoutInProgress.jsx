import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetWorkoutById } from "../../Managers/WorkoutManager";
import { getExerciseByWorkoutId } from "../../Managers/WorkoutExerciseManager";
import { Input } from "reactstrap";

export const WorkoutInProgress = () => {
  const { workoutId } = useParams();
  const [workout, setWorkout] = useState({});
  const [workoutExercises, setWorkoutExercises] = useState([]);

  useEffect(() => {
    GetWorkoutById(workoutId).then((data) => setWorkout(data));
  }, []);

  useEffect(() => {
    getExerciseByWorkoutId(workoutId).then((data) => setWorkoutExercises(data));
  }, []);

  return (
    <div className="workoutInProgress">
      <h2>{workout.name}</h2>
      {workoutExercises.map((we) => {
        return (
          <div>
            {we.exerciseName}

            <div className="progressInfo">
              <Input
                className="progressInput"
                type="number"
                placeholder="Sets"
              ></Input>
              <Input
                className="progressInput"
                type="number"
                placeholder="Reps"
              ></Input>
            </div>
            <div className="progressInfo">
              <Input
                className="progressInput"
                type="number"
                placeholder="Weight"
              ></Input>
              <Input type="select" className="progressInput">
                <option value="lbs">lbs</option>
                <option value="kgs">kgs</option>
              </Input>
            </div>
            <Input className="notesInput" placeholder="Notes"></Input>
          </div>
        );
      })}
    </div>
  );
};
