import { Link, useNavigate, useParams } from "react-router-dom";
import { getMuscles } from "../../Managers/MuscleManager";
import { Input, Tooltip } from "reactstrap";
import { useEffect, useState } from "react";
import { GetExerciseById, updateExercise } from "../../Managers/ExerciseManager";
import { ArrowLeft, ArrowLeftSquare } from "react-bootstrap-icons";

export const ExerciseEdit = () => {
    const [exercise, setExercise] = useState({});
    const [muscles, setMuscles] = useState([]);
    const [toolTipOpen1, setToolTipOpen1] = useState(false);
    const toggle1 = () => setToolTipOpen1(!toolTipOpen1);
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
          id: exercise.id,
          userId: exercise.userId
        };
        updateExercise(newExercise).then(() => {
          navigate("/exercises");
        });
      }
    };
  
    return (
      <form className="coreComponent" onSubmit={handleSave}>
        <div className="backButton">
        <ArrowLeft
          size={30}
          id="backTarget"
          onClick={(event) => {
            navigate(`/exercises`);
          }}
        />
        <Tooltip
          isOpen={toolTipOpen1}
          target="backTarget"
          toggle={toggle1}
          placement="top"
        >
          Back
        </Tooltip>
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
          <button type="submit" className="exerciseButton">Save</button>
        </fieldset>
      </form>
    );
}