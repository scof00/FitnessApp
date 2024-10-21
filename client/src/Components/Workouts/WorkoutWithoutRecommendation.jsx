import { Input, Label } from "reactstrap";
import { Accordion, AccordionItem } from "react-bootstrap";
export const WithoutRecommendation = ({
  we,
  exerciseProgress,
  setExerciseProgress,
}) => {
  return (
      <Accordion.Item>
        <Accordion.Header style={{ fontSize: "17px" }}>
          <b>{we.exerciseName}</b>
        </Accordion.Header>
        <Accordion.Body>

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
              min={0}
              max={2000}
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
              min={0}
              max={2000}
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
          </Accordion.Body>
      </Accordion.Item>
  );
};
