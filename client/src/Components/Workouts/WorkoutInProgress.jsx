import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetWorkoutById } from "../../Managers/WorkoutManager";
import { getExerciseByWorkoutId } from "../../Managers/WorkoutExerciseManager";
import { Input } from "reactstrap";
import { CreateProgress } from "../../Managers/ProgressManager";

export const WorkoutInProgress = ({currentUser}) => {
  const { workoutId } = useParams();
  const [workout, setWorkout] = useState({});
  const [workoutExercises, setWorkoutExercises] = useState([]);
  const [exerciseProgress, setExerciseProgress] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    GetWorkoutById(workoutId).then((data) => setWorkout(data));
  }, []);

  useEffect(() => {
    getExerciseByWorkoutId(workoutId).then((data) => setWorkoutExercises(data));
  }, []);

  useEffect(() => {
    const progressCopy = [];
    workoutExercises.map((we) => {
      const exerciseObj = { exerciseId: we.exerciseId };
      progressCopy.push(exerciseObj);
      setExerciseProgress(progressCopy);
    });
  }, [workoutExercises]);

  const handleSubmit = (event) => {
    event.preventDefault();
    {exerciseProgress.map((ep) => {
      const newProgress = {
        userId: currentUser.id,
        exerciseId: ep.exerciseId,
        reps: ep.reps,
        sets: ep.sets,
        weight: ep.weight,
        notes: ep?.notes,
        weightType: ep.weightType,
      }
      CreateProgress(newProgress)
    })}
    (navigate("/"))
  }

  return (
    <div className="workoutInProgress">
      <h2><u>{workout.name}</u></h2>
      {workoutExercises.map((we) => {
        return (
          <div>
            {we.exerciseName}

            <div className="progressInfo">
              <Input
                className="progressInput"
                required
                type="number"
                placeholder="Sets"
                onChange={(event) => {
                  const ExerciseProgressCopy = [...exerciseProgress];
                  ExerciseProgressCopy.map((e) => {
                    if (e.exerciseId === we.exerciseId) {
                      e.sets = parseInt(event.target.value);
                      setExerciseProgress(ExerciseProgressCopy);
                    }
                  });
                }}
              ></Input>
              <Input
              required
                className="progressInput"
                type="number"
                placeholder="Reps"
                onChange={(event) => {
                  const ExerciseProgressCopy = [...exerciseProgress];
                  ExerciseProgressCopy.map((e) => {
                    if (e.exerciseId === we.exerciseId) {
                      e.reps = parseInt(event.target.value);
                      setExerciseProgress(ExerciseProgressCopy);
                    }
                  });
                }}
              ></Input>
            </div>
            <div className="progressInfo">
              <Input
                className="progressInput"
                required
                type="number"
                placeholder="Weight"
                onChange={(event) => {
                  const ExerciseProgressCopy = [...exerciseProgress];
                  ExerciseProgressCopy.map((e) => {
                    if (e.exerciseId === we.exerciseId) {
                      e.weight = parseInt(event.target.value);
                      setExerciseProgress(ExerciseProgressCopy);
                    }
                  });
                }}
              ></Input>
              <Input
                type="select"
                required
                className="progressInput"
                onChange={(event) => {
                  const ExerciseProgressCopy = [...exerciseProgress];
                  ExerciseProgressCopy.map((e) => {
                    if (e.exerciseId === we.exerciseId) {
                      e.weightType = event.target.value;
                      setExerciseProgress(ExerciseProgressCopy);
                    }
                  });
                }}
              >
                <option>Weight</option>
                <option value="lbs">lbs</option>
                <option value="kgs">kgs</option>
              </Input>
            </div>
            <Input
              className="notesInput"
              placeholder="Notes"
              onChange={(event) => {
                const ExerciseProgressCopy = [...exerciseProgress];
                ExerciseProgressCopy.map((e) => {
                  if (e.exerciseId === we.exerciseId) {
                    e.notes = event.target.value;
                    setExerciseProgress(ExerciseProgressCopy);
                  }
                });
              }}
            ></Input>
          </div>
        );
      })}
      <button className="exerciseButton" onClick={handleSubmit}>Finish Workout</button>
    </div>
  );
};
