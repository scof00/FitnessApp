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
import { Accordion } from "react-bootstrap";
import {
  CreateProgress,
  GetLatestByExerciseId,
} from "../../Managers/ProgressManager";
import { ArrowLeft, ArrowLeftSquare } from "react-bootstrap-icons";
import { WorkoutRecommendation } from "./WorkoutRecommendation";
import { WithoutRecommendation } from "./WorkoutWithoutRecommendation";

export const WorkoutInProgress = ({ currentUser }) => {
  const { workoutId } = useParams();
  const [workout, setWorkout] = useState({});
  const [workoutExercises, setWorkoutExercises] = useState([]);
  const [exerciseProgress, setExerciseProgress] = useState([]);
  const [modal, setModal] = useState(false);
  const [lastProgress, setLastProgress] = useState([]);
  const [usingRecommendation, setUsingRecommendation] = useState(false);
  const [recommendationData, setRecommendationData] = useState([]);
  const navigate = useNavigate();
  const [exitModal, setExitModal] = useState(false);
  const toggle = () => setModal(!modal);
  const toggleExit = () => setExitModal(!exitModal);

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

  useEffect(() => {
    const latestProgress = [];
    workoutExercises.map((we) => {
      GetLatestByExerciseId(we.exerciseId)
        .then((data) => latestProgress.push(data))
        .then(setLastProgress(latestProgress));
    });
  }, [workoutExercises]);

  const showValidationSnackbar = () => {
    var x = document.getElementById("validation");

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let weightTypeSelected = true;
    exerciseProgress.some((p) => {
      if (p.exerciseId === undefined) {
        const progressCopy = [...exerciseProgress];
        const indexToDelete = progressCopy.indexOf(p);
        progressCopy.splice(indexToDelete, 1);
        setExerciseProgress(progressCopy);
      } else if (
        !p.weightType ||
        p.weightType === "Weight" ||
        p.weightType === undefined
      ) {
        weightTypeSelected = false;
      }
    });

    if (weightTypeSelected === false) {
      showValidationSnackbar();
    } else {
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
      navigate("/home", { state: { message: "Progress saved." } })
       
    }
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
  let recommendations = [];

  const formula = async (type) => {
    await setUsingRecommendation(false);
    recommendations = [];
    let repMax = 0;
    lastProgress.map((lp) => {
      let step1 = 37 - lp.reps;
      let step2 = 36 / step1;
      let step3 = lp.weight * step2;
      repMax = step3;
      if (type === 1) {
        const finalWeight = Math.round(repMax * 0.9);
        const recommendation = {
          weight: finalWeight,
          reps: 4,
          sets: 6,
          exerciseId: lp.exerciseId,
        };
        setUsingRecommendation(true);
        recommendations.push(recommendation);
        setExerciseProgress(recommendations);
        setRecommendationData(recommendations);

        toggle();
      } else if (type === 2) {
        const finalWeight = Math.round(repMax * 0.75);
        const recommendation = {
          weight: finalWeight,
          reps: 10,
          sets: 4,
          exerciseId: lp.exerciseId,
        };
        recommendations.push(recommendation);

        setUsingRecommendation(true);
        setExerciseProgress(recommendations);
        setRecommendationData(recommendations);
        toggle();
      } else if (type === 3) {
        const finalWeight = Math.round(repMax * 0.5);
        const recommendation = {
          weight: finalWeight,
          reps: 15,
          sets: 2,
          exerciseId: lp.exerciseId,
        };
        recommendations.push(recommendation);
        setUsingRecommendation(true);

        setExerciseProgress(recommendations);
        setRecommendationData(recommendations);

        toggle();
      }
    });
  };

  const cancelRecommendation = () => {
    setUsingRecommendation(false);
    toggle();
  };

  return (
    <form className="workoutInProgress, coreComponent" onSubmit={handleSubmit}>
      <div id="validation">Please select weight type.</div>
      <div className="backButton">
        <ArrowLeft size={30} onClick={toggleExit} />
      </div>
      <h2>
        <u>{workout.name}</u>
      </h2>
      <Button
        color="info"
        className="recommendationsButton"
        outline
        onClick={toggle}
      >
        Recommendations
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Recommendations</ModalHeader>
        <ModalBody>
          We can give you recommendations on how much to workout out based on
          your fitness goals. We cannot give recommendations if you have not
          attempted the exercise before.
          <br></br>
          <hr></hr>
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
          <Button
            color="danger"
            onClick={() => {
              formula(1);
            }}
          >
            Strength
          </Button>{" "}
          <Button color="warning" onClick={() => formula(2)}>
            Hypertrophy
          </Button>{" "}
          <Button color="success" onClick={() => formula(3)}>
            Endurance
          </Button>{" "}
          <Button color="secondary" onClick={cancelRecommendation}>
            Clear
          </Button>
        </ModalFooter>
      </Modal>
      {workoutExercises.map((we) => {
        return (
          <div className="workoutExercise">
            {usingRecommendation ? (
              <Accordion
                defaultActiveKey="0"
                className="workoutInProgressAccordion"
                onClick={() => close}
              >
                <WorkoutRecommendation
                  we={we}
                  exerciseProgress={exerciseProgress}
                  setExerciseProgress={setExerciseProgress}
                  recommendationData={recommendationData}
                />
              </Accordion>
            ) : (
              <Accordion
                defaultActiveKey="0"
                className="workoutInProgressAccordion"
                onClick={() => close}
              >
                <WithoutRecommendation
                  we={we}
                  exerciseProgress={exerciseProgress}
                  setExerciseProgress={setExerciseProgress}
                />
              </Accordion>
            )}
          </div>
        );
      })}
      <Modal isOpen={exitModal} toggle={toggleExit}>
        <ModalHeader toggle={toggleExit}>
          Are you sure you want to leave?
        </ModalHeader>
        <ModalBody>
          Your progress will not be saved and you will have to restart your
          workout.
          <br />
          <br />
          Click "Leave" to return to workouts or "Cancel" to stay here.
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => navigate("/workouts")}>
            Leave
          </Button>{" "}
          <Button color="secondary" onClick={toggleExit}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <button className="exerciseButton" type="submit">
        Finish Workout
      </button>
    </form>
  );
};
