import { Link, useNavigate, useParams } from "react-router-dom";
import { getMuscles } from "../../Managers/MuscleManager";
import { Input } from "reactstrap";
import { useEffect, useState } from "react";
import { GetExerciseById, updateExercise } from "../../Managers/ExerciseManager";
import { ArrowLeft, ArrowLeftSquare } from "react-bootstrap-icons";

export const ExerciseEdit = () => {
    const [exercise, setExercise] = useState({});
    const [muscles, setMuscles] = useState([]);
    const {exerciseId} =useParams();
  
    const navigate = useNavigate();
    useEffect(() => {
      getMuscles().then((data) => setMuscles(data));
    }, []);
    useEffect(() =>{
        GetExerciseById(exerciseId).then((data) => {
            setExercise(data)
        })
    },[])
  
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
          id: exercise.id,
          userId: exercise.userId
        };
        updateExercise(newExercise).then(() => {
          navigate("/exercises");
        });
      }
    };
  
    return (
      <form className="coreComponent">
        <div className="backButton">
        <ArrowLeft
          size={30}
          onClick={(event) => {
            navigate(`/exercises`);
          }}
        />
      </div>
        <h2>Edit <b>{exercise.name}</b></h2>
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
            defaultValue={exercise.name}
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
          <button onClick={handleSave} className="exerciseButton">Save</button>
        </fieldset>
      </form>
    );
}