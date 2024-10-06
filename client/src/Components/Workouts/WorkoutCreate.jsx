import { useEffect, useState } from "react";
import { GetExerciseByUserId } from "../../Managers/ExerciseManager";
import { useParams } from "react-router-dom";
import { Input } from "reactstrap";
import { Exercises } from "../Exercises/Exercises";
import { ExercisesForUse } from "../Exercises/ExercisesForUse";
import { PlusCircle } from "react-bootstrap-icons";

export const WorkoutCreate = ({ currentUser }) => {
  const [workout, setWorkout] = useState({});
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    GetExerciseByUserId(currentUser.id).then((data) => {
      setExercises(data);
    });
  }, []);

  return (
    <div className="workoutCreateForm">
      <h2>Create a new workout</h2>
      <Input placeholder="Workout Name" onChange={(event) => {
        const workoutCopy = {...workout};
        workoutCopy.name = event.target.value;
        setWorkout(workoutCopy)
      }}>
      </Input>
      <button><PlusCircle/></button>
      <ExercisesForUse currentUser={currentUser}/>
    </div>
  );
};
