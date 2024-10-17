import { Input, Label } from "reactstrap";

export const WorkoutRecommendation = ({
  we,
  exerciseProgress,
  setExerciseProgress,
}) => {
  // Find a match in exerciseProgress array where exerciseId matches
  const matchingProgress = exerciseProgress.find(
    (r) => r.exerciseId === we.exerciseId
  );

  if (matchingProgress) {
    // Render when a match is found
    return (
      <div>
        <u>{we.exerciseName}</u>
        <div className="progressLine">
          <div className="progressInfo">
            <Label className="workoutLabel">Sets:</Label>
            <Input
              className="progressInput"
              required
              min={0}
              max={2000}
              defaultValue={matchingProgress.sets}
              type="number"
              placeholder="Sets"
              onChange={(event) => {
                const ExerciseProgressCopy = [...exerciseProgress];
                ExerciseProgressCopy.forEach((e) => {
                  if (e.exerciseId === we.exerciseId) {
                    e.sets = parseInt(event.target.value);
                    setExerciseProgress(ExerciseProgressCopy);
                  }
                });
              }}
            ></Input>
          </div>
          <div className="progressInfo">
            <Label className="workoutLabel"> Repetitions: </Label>
            <Input
              required
              className="progressInput"
              defaultValue={matchingProgress.reps}
              min={0}
              max={2000}
              type="number"
              placeholder="Reps"
              onChange={(event) => {
                const ExerciseProgressCopy = [...exerciseProgress];
                ExerciseProgressCopy.forEach((e) => {
                  if (e.exerciseId === we.exerciseId) {
                    e.reps = parseInt(event.target.value);
                    setExerciseProgress(ExerciseProgressCopy);
                  }
                });
              }}
            ></Input>
          </div>
        </div>
        <div className="progressLine">
          <div className="progressInfo">
            <Label className="workoutLabel">Weight:</Label>
            <Input
              className="progressInput"
              required
              min={0}
              max={2000}
              defaultValue={matchingProgress.weight}
              type="number"
              placeholder="Weight"
              onChange={(event) => {
                const ExerciseProgressCopy = [...exerciseProgress];
                ExerciseProgressCopy.forEach((e) => {
                  if (e.exerciseId === we.exerciseId) {
                    e.weight = parseInt(event.target.value);
                    setExerciseProgress(ExerciseProgressCopy);
                  }
                });
              }}
            ></Input>
          </div>
          <div className="progressInfo">
            <Label className="workoutLabel"> Type:</Label>
            <Input
              type="select"
              required
              className="progressInput"
              defaultValue={matchingProgress.weightType}
              onChange={(event) => {
                const ExerciseProgressCopy = [...exerciseProgress];
                ExerciseProgressCopy.forEach((e) => {
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
        </div>
        <Label>Notes: </Label>
        <Input
          className="notesInput"
          placeholder="Notes"
          defaultValue={matchingProgress.notes}
          onChange={(event) => {
            const ExerciseProgressCopy = [...exerciseProgress];
            ExerciseProgressCopy.forEach((e) => {
              if (e.exerciseId === we.exerciseId) {
                e.notes = event.target.value;
                setExerciseProgress(ExerciseProgressCopy);
              }
            });
          }}
        ></Input>
      </div>
    );
  } else {
    // Render when no match is found
    const exerciseCopy = [...exerciseProgress];
    exerciseCopy.push({ exerciseId: we.exerciseId });
    console.log(exerciseCopy);
    setExerciseProgress(exerciseCopy);
    return (
      <div>
        <u>{we.exerciseName}</u>
        <div className="progressLine">
          <div className="progressInfo">
            <Label className="workoutLabel">Sets:</Label>
            <Input
              className="progressInput"
              required
              min={0}
              max={2000}
              type="number"
              placeholder="Sets"
              onChange={(event) => {
                const ExerciseProgressCopy = [...exerciseProgress];
                ExerciseProgressCopy.forEach((e) => {
                  if (e.exerciseId === we.exerciseId) {
                    e.sets = parseInt(event.target.value);
                    setExerciseProgress(ExerciseProgressCopy);
                  }
                });
              }}
            ></Input>
          </div>
          <div className="progressInfo">
            <Label className="workoutLabel"> Repetitions: </Label>
            <Input
              required
              className="progressInput"
              min={0}
              max={2000}
              type="number"
              placeholder="Reps"
              onChange={(event) => {
                const ExerciseProgressCopy = [...exerciseProgress];
                ExerciseProgressCopy.forEach((e) => {
                  if (e.exerciseId === we.exerciseId) {
                    e.reps = parseInt(event.target.value);
                    setExerciseProgress(ExerciseProgressCopy);
                  }
                });
              }}
            ></Input>
          </div>
        </div>
        <div className="progressLine">
          <div className="progressInfo">
            <Label className="workoutLabel">Weight:</Label>
            <Input
              className="progressInput"
              required
              min={0}
              max={2000}
              type="number"
              placeholder="Weight"
              onChange={(event) => {
                const ExerciseProgressCopy = [...exerciseProgress];
                ExerciseProgressCopy.forEach((e) => {
                  if (e.exerciseId === we.exerciseId) {
                    e.weight = parseInt(event.target.value);
                    setExerciseProgress(ExerciseProgressCopy);
                  }
                });
              }}
            ></Input>
          </div>
          <div className="progressInfo">
            <Label className="workoutLabel"> Type:</Label>
            <Input
              type="select"
              required
              className="progressInput"
              onChange={(event) => {
                const ExerciseProgressCopy = [...exerciseProgress];
                ExerciseProgressCopy.forEach((e) => {
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
        </div>
        <Label>Notes: </Label>
        <Input
          className="notesInput"
          placeholder="Notes"
          onChange={(event) => {
            const ExerciseProgressCopy = [...exerciseProgress];
            ExerciseProgressCopy.forEach((e) => {
              if (e.exerciseId === we.exerciseId) {
                e.notes = event.target.value;
                setExerciseProgress(ExerciseProgressCopy);
              }
            });
          }}
        ></Input>
      </div>
    );
  }
};
