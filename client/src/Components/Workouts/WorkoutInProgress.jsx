import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetWorkoutById } from "../../Managers/WorkoutManager";
import { getExerciseByWorkoutId } from "../../Managers/WorkoutExerciseManager";
import {
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { CreateProgress } from "../../Managers/ProgressManager";
import { ArrowLeft, ArrowLeftSquare } from "react-bootstrap-icons";

export const WorkoutInProgress = ({ currentUser }) => {
  const { workoutId } = useParams();
  const [workout, setWorkout] = useState({});
  const [workoutExercises, setWorkoutExercises] = useState([]);
  const [exerciseProgress, setExerciseProgress] = useState([]);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const toggle = () => setModal(!modal);

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
    {
      exerciseProgress.map((ep) => {
        const newProgress = {
          userId: currentUser.id,
          exerciseId: ep.exerciseId,
          reps: ep.reps,
          sets: ep.sets,
          weight: ep.weight,
          notes: ep?.notes,
          weightType: ep.weightType,
          dateCompleted: new Date(),
        };
        CreateProgress(newProgress);
      });
    }
    navigate("/");
  };

  const alert = (event) => {
    event.preventDefault();
    if (
      confirm("WARNING: Leaving the page will cause you to lose your progress!")
    ) {
      navigate("/workouts");
    } else {
    }
  };

  return (
    <div className="workoutInProgress, coreComponent">
      <div className="backButton">
        <ArrowLeft size={30} onClick={alert} />
      </div>
      <h2>
        <u>{workout.name}</u>
      </h2>
      <Button color="info" className="recommendationsButton"outline onClick={toggle}>Recommendations</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Recommendations</ModalHeader>
        <ModalBody>
          We can give you recommendations on how much to workout out based on
          your fitness goals.
          <br></br>
          <b>Strength Training</b>- Less repetitions, more sets, and heavier
          weight to improve your strength!
          <br></br>
          <b>Hypertrophy Training</b>- Moderate amount of repetitions, sets, and
          weight to promote muscle size.
          <br></br>
          <b>Endurance Training</b>- More reps, less sets, less weight to
          improve your endurance!
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggle}>
            Strength
          </Button>{" "}
          <Button color="warning" onClick={toggle}>
            Hypertrophy
          </Button>{" "}
          <Button color="success" onClick={toggle}>
            Endurance
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      {workoutExercises.map((we) => {
        return (
          <div className="workoutExercise">
            <u>{we.exerciseName}</u>
            <div className="progressLine">
              <div className="progressInfo">
                <Label className="workoutLabel">Sets:</Label>

                <Input
                  className="progressInput"
                  required
                  defaultValue={10}
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
      })}
      <button className="exerciseButton" onClick={handleSubmit}>
        Finish Workout
      </button>
    </div>
  );
};
