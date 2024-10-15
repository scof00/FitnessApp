import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMuscles } from "../../Managers/MuscleManager";
import { Input } from "reactstrap";
import { createExercise } from "../../Managers/ExerciseManager";
import "./Exercise.css"
import { ArrowLeft } from "react-bootstrap-icons";

export const ExerciseCreate = ({ currentUser }) => {
  const [exercise, setExercise] = useState({});
  const [muscles, setMuscles] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    getMuscles().then((data) => setMuscles(data));
  }, []);
  const showValidationSnackbar = () => {

    
    var x = document.getElementById("validation");
    
    // Add the "show" class to DIV
    x.className = "show";
    
    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  }

  const handleSave = (event) => {
    event.preventDefault();
    if (!exercise.muscleId || exercise.muscleId === 0) {
      showValidationSnackbar();
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
    <form className="exerciseCreateForm, coreComponent" onSubmit={handleSave}>
      <div id="validation">Please select a muscle group.</div>
      <div className="backButton">
        <ArrowLeft
          size={30}
          onClick={(event) => {
            navigate(`/exercises`);
          }}
        />
      </div>
      <h2>Add a new exercise</h2>
      <fieldset>
        <Input
        className="exerciseFormInput"
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
          className="exerciseFormInput"
          required
          onChange={(event) => {
            const exerciseCopy = { ...exercise };
            exerciseCopy.name = event.target.value;
            setExercise(exerciseCopy);
          }}
        ></Input>
      </fieldset>
      <fieldset>
        <button type="submit" className="exerciseButton">Create Exercise</button>
      </fieldset>
    </form>
  );
};
