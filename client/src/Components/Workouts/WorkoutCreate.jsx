import { useEffect, useState } from "react";
import {
  GetExerciseById,
  GetExerciseByUserId,
} from "../../Managers/ExerciseManager";
import { useNavigate, useParams } from "react-router-dom";
import { Accordion, Input } from "reactstrap";
import { Exercises } from "../Exercises/Exercises";
import { ExercisesForUse } from "../Exercises/ExercisesForWorkoutCreate";
import { ArrowLeftSquare, PlusCircle, XSquare } from "react-bootstrap-icons";
import { getMuscles } from "../../Managers/MuscleManager";
import { CreateWorkout } from "../../Managers/WorkoutManager";
import { CreateWorkoutExercise } from "../../Managers/WorkoutExerciseManager";

export const WorkoutCreate = ({ currentUser }) => {
  const [workout, setWorkout] = useState({});
  const [workoutExercises, setWorkoutExercises] = useState([]);
  const [exercises, setExercises] = useState([]);
  const navigate = useNavigate();
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
      }
    });
  };

  const handleSave = (event) => {
    event.preventDefault();
    const newWorkout = {
      name: workout.name,
      userId: currentUser.id,
    };
    CreateWorkout(newWorkout)
      .then((data) => {
        if (data) {
          {
            workoutExercises.map((we) => {
              const newWorkoutExercise = {
                workoutId: data,
                exerciseId: we,
              };
              CreateWorkoutExercise(newWorkoutExercise);
            });
          }
        }
      })
      .then(() => {
        navigate("/workouts");
      });
  };

  return (
    <div className="workoutCreateForm">
      <div className="backButton">
        <ArrowLeftSquare
          size={30}
          onClick={(event) => {
            navigate(`/workouts`);
          }}
        />
      </div>
      <h2>Create a new workout</h2>
      <Input
        placeholder="Workout Name"
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
              if (we === e.id) {
                return (
                  <div className="editAndDelete">
                    {e.name}
                    <div>
                      <XSquare size={25}
                        onClick={(event) => {
                          event.stopPropagation();
                          removeExercise(e.id);
                        }}
                      />
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
      <button
        className="exerciseButton"
        onClick={handleSave}
      >
        Create New Workout
      </button>
    </div>
  );
};
