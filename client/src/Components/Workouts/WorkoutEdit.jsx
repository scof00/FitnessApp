import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetWorkoutById, updateWorkout } from "../../Managers/WorkoutManager";
import {
  CreateWorkoutExercise,
  DeleteByWorkoutId,
  getExerciseByWorkoutId,
} from "../../Managers/WorkoutExerciseManager";
import { ExercisesForUse } from "../Exercises/ExercisesForWorkoutCreate";
import { Input, Tooltip } from "reactstrap";
import { GetExerciseByUserId } from "../../Managers/ExerciseManager";
import { ArrowLeft, ArrowLeftSquare, XSquare } from "react-bootstrap-icons";

export const WorkoutEdit = ({ currentUser }) => {
  const [workout, setWorkout] = useState({});
  const [workoutExercises, setWorkoutExercises] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [toolTipOpen1, setToolTipOpen1] = useState(false);
  const toggle1 = () => setToolTipOpen1(!toolTipOpen1);
  const [toolTipOpen2, setToolTipOpen2] = useState(false);
  const toggle2 = () => setToolTipOpen2(!toolTipOpen2);
  const [toolTipOpen3, setToolTipOpen3] = useState(false);
  const toggle3 = () => setToolTipOpen3(!toolTipOpen3);
  const { workoutId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    GetWorkoutById(workoutId).then((data) => setWorkout(data));
  }, []);

  useEffect(() => {
    getExerciseByWorkoutId(workoutId).then((data) => setWorkoutExercises(data));
  }, []);
  useEffect(() => {
    GetExerciseByUserId(currentUser.id).then((data) => setExercises(data));
  }, []);

  const removeExercise = (exerciseId) => {
    workoutExercises.map((we) => {
      if (we === exerciseId) {
        const workoutExercisesCopy = [...workoutExercises];
        let index = workoutExercisesCopy.indexOf(exerciseId);
        // console.log(index)
        workoutExercisesCopy.splice(index, 1);
        console.log(workoutExercisesCopy);
        setWorkoutExercises(workoutExercisesCopy);
      } else if (we.exerciseId === exerciseId) {
        const workoutExercisesCopy = [...workoutExercises];
        let index = workoutExercisesCopy.indexOf(we);
        // console.log(index)
        workoutExercisesCopy.splice(index, 1);
        console.log(workoutExercisesCopy);
        setWorkoutExercises(workoutExercisesCopy);
      }
    });
  };

  const handleSave = (event) => {
    event.preventDefault();
    const editWorkout = {
      id: workout.id,
      name: workout.name,
      userId: workout.userId,
    };
    updateWorkout(editWorkout).then(() => {
      DeleteByWorkoutId(workout.id)
        .then(() => {
          workoutExercises.map((we) => {
            if (!we.exerciseId) {
              const newWorkoutExercise = {
                workoutId: workout.id,
                exerciseId: we,
              };
              CreateWorkoutExercise(newWorkoutExercise);
            } else {
              const newWorkoutExercise = {
                workoutId: workout.id,
                exerciseId: we.exerciseId,
              };
              CreateWorkoutExercise(newWorkoutExercise);
            }
          });
        })
        .then(() => navigate("/workouts"));
    });
  };

  return (
    <div className="coreComponent">
      <div className="backButton">
        <ArrowLeft
          size={30}
          onClick={(event) => {
            navigate(`/workouts`);
          }}
          id="backTarget"
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
      <h2>Edit Workout</h2>
      <Input
        defaultValue={workout.name}
        onChange={(event) => {
          const workoutCopy = { ...workout };
          workoutCopy.name = event.target.value;
          setWorkout(workoutCopy);
        }}
      ></Input>
      {exercises.map((e) => {
        return (
          <div>
            {workoutExercises.map((we) => {
              if (we.exerciseId === e.id || we === e.id) {
                return (
                  <div className="editAndDelete">
                    {e.name}
                    <div>
                      <XSquare
                        onClick={(event) => {
                          event.stopPropagation();
                          removeExercise(e.id);
                        }}
                        id="removeTarget"
                      />
                      <Tooltip
                        isOpen={toolTipOpen2}
                        target="removeTarget"
                        toggle={toggle2}
                        placement="top"
                      >
                        Remove
                      </Tooltip>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        );
      })}

      <ExercisesForUse
        currentUser={currentUser}
        workoutExercises={workoutExercises}
        setWorkoutExercises={setWorkoutExercises}
      />
      <button className="exerciseButton" onClick={handleSave}>
        Save Workout
      </button>
    </div>
  );
};
