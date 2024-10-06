import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMuscles } from "../../Managers/MuscleManager";
import { Input } from "reactstrap";
import { createExercise } from "../../Managers/ExerciseManager";

export const ExerciseCreate = ({ currentUser }) => {
  const [exercise, setExercise] = useState({});
  const [muscles, setMuscles] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    getMuscles().then((data) => setMuscles(data));
  }, []);

  const handleSave = (event) => {
    event.preventDefault();
    if (!exercise.muscleId) {
      window.alert("Please select muscle group!");
    } else if (!exercise.name) {
      window.alert("Please enter an exercise name!");
    } else {
      const newExercise = {
        name: exercise.name,
        muscleId: exercise.muscleId,
        userId: currentUser.id,
      };
      createExercise(newExercise).then(() => {
        navigate("/exercises");
      });
    }
  };

  return (
    <form>
      <h2>Add a new exercise</h2>
      <fieldset>
        <Input
          id="muscleSelect"
          name="select"
          type="select"
          required
          onChange={(event) => {
            const exerciseCopy = { ...exercise };
            exerciseCopy.muscleId = parseInt(event.target.value);
            setExercise(exerciseCopy);
          }}
        >
          <option value={0}>Select Muscle</option>
          {muscles.map((m) => {
            return (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            );
          })}
        </Input>
      </fieldset>
      <fieldset>
        <Input
          id="exerciseName"
          name="exerciseName"
          placeholder="Exercise Name"
          required
          onChange={(event) => {
            const exerciseCopy = { ...exercise };
            exerciseCopy.name = event.target.value;
            setExercise(exerciseCopy);
          }}
        ></Input>
      </fieldset>
      <fieldset>
        <button onClick={handleSave}>Create Exercise</button>
      </fieldset>
    </form>
  );
};
