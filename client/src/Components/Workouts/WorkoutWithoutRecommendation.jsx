import { Input, Label } from "reactstrap";

export const WithoutRecommendation = ({
  we,
  exerciseProgress,
  setExerciseProgress,
}) => {
  return (
    <div>
      <u>{we.exerciseName}</u>
      <div className="progressLine">
        <div className="progressInfo">
          <Label className="workoutLabel">Sets:</Label>

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
        </div>
        <div className="progressInfo">
          <Label className="workoutLabel"> Repetitions: </Label>

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
      </div>
      <div className="progressLine">
        <div className="progressInfo">
          <Label className="workoutLabel">Weight:</Label>
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
        </div>
        <div className="progressInfo">
          <Label className="workoutLabel"> Type:</Label>

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
      </div>
      <Label>Notes: </Label>
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
};
