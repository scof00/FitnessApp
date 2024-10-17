import { useEffect, useState } from "react";
import {
  GetExerciseById,
  GetExerciseByUserId,
} from "../../Managers/ExerciseManager";
import { useNavigate, useParams } from "react-router-dom";
import { Accordion, Form, Input, Tooltip } from "reactstrap";
import { Exercises } from "../Exercises/Exercises";
import { ExercisesForUse } from "../Exercises/ExercisesForWorkoutCreate";
import {
  ArrowLeft,
  ArrowLeftSquare,
  PlusCircle,
  XSquare,
} from "react-bootstrap-icons";
import { getMuscles } from "../../Managers/MuscleManager";
import { CreateWorkout } from "../../Managers/WorkoutManager";
import { CreateWorkoutExercise } from "../../Managers/WorkoutExerciseManager";

export const WorkoutCreate = ({ currentUser }) => {
  const [workout, setWorkout] = useState({});
  const [workoutExercises, setWorkoutExercises] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [toolTipOpen1, setToolTipOpen1] = useState(false);
  const toggle1 = () => setToolTipOpen1(!toolTipOpen1);
  const [toolTipOpen2, setToolTipOpen2] = useState(false);
  const toggle2 = () => setToolTipOpen2(!toolTipOpen2);
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
    <Form className="workoutCreateForm, coreComponent" onSubmit={handleSave}>
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
      <h2>Create a new workout</h2>
      <Input
        placeholder="Workout Name"
        required
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
                      <XSquare
                        size={25}
                        id="removeTarget"
                        onClick={(event) => {
                          event.stopPropagation();
                          removeExercise(e.id);
                        }}
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
      <button className="exerciseButton" type="submit">
        Create New Workout
      </button>
    </Form>
  );
};
