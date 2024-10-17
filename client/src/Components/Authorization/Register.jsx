import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { CreateUser, GetAllUsers, login } from "../../Managers/UserManager";
import { ArrowLeft } from "react-bootstrap-icons";
import { CreateWorkout } from "../../Managers/WorkoutManager";
import { createStarterExercise } from "../../Managers/ExerciseManager";
import { CreateWorkoutExercise } from "../../Managers/WorkoutExerciseManager";

export const Register = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  const starterExercises = [
    { muscleId: 1, name: "Bench Press" },
    { muscleId: 4, name: "Bicep Curls" },
    { muscleId: 3, name: "Lunges" },
  ];
  const starterWorkout = { name: "Beginner Workout" };

  console.log(starterExercises);
  console.log(starterWorkout);

  useEffect(() => {
    GetAllUsers().then((data) => setUsers(data));
  }, []);

  const showRejectionSnackbar = () => {
    var x = document.getElementById("rejection");

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  };

  const showValidationSnackbar = () => {
    var x = document.getElementById("validation");

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    let sameUser = false;

    users.some((u) => {
      if (u.userName === username) {
        return (sameUser = true);
      }
    });

    if (sameUser) {
      showRejectionSnackbar();
    } else if (username === "" || password === "") {
      showValidationSnackbar();
    } else {
      const userProfile = {
        username: username,
        password: password,
        isAdmin: false,
      };

      CreateUser(userProfile)
        .then((userId) => {
          if (userId) {
            {
              const userProfileSet = {
                username: username,
                password: password,
                isAdmin: false,
                userId: userId,
              };
              localStorage.setItem(
                "FitnessAppUser",
                JSON.stringify(userProfileSet)
              );
              const newWorkout = {
                name: starterWorkout.name,
                userId: userId,
              };
              CreateWorkout(newWorkout).then((workoutId) => {
                if (workoutId) {
                  starterExercises.map((exercises) => {
                    const newExercise = {
                      muscleId: exercises.muscleId,
                      name: exercises.name,
                      userId: userId,
                    };
                    createStarterExercise(newExercise).then((exerciseId) => {
                      if (exerciseId) {
                        const workoutExercise = {
                          workoutId: workoutId,
                          exerciseId: exerciseId,
                        };
                        CreateWorkoutExercise(workoutExercise);
                      }
                    });
                  });
                }
              });
            }
          }
        })
        .then(login(username, password))
        .then(setIsLoggedIn(true))
        .then(navigate("/home"));
    }
  };

  return (
    <Form className="loginForm">
      <div id="rejection">Username taken.</div>
      <div id="validation">Please fill out all fields.</div>
      <div className="backButton">
        <ArrowLeft
          size={30}
          onClick={(event) => {
            navigate(`login`);
          }}
        />
      </div>
      <fieldset>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            id="username"
            required
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          ></Input>
        </FormGroup>
      </fieldset>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          id="password"
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <button className="exerciseButton" onClick={(e) => loginSubmit(e)}>
          Register
        </button>
      </FormGroup>
    </Form>
  );
};
