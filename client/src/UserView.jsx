import { Navbar } from "./Components/Navbar/Navbar";
import { Outlet, Route, Routes } from "react-router-dom";
import { Home } from "./Components/Home";
import { Workouts } from "./Components/Workouts/Workouts";
import { Exercises } from "./Components/Exercises/Exercises";
import { WorkoutCreate } from "./Components/Workouts/WorkoutCreate";
import { ExerciseCreate } from "./Components/Exercises/ExerciseCreate";
import { ExerciseEdit } from "./Components/Exercises/ExerciseEdit";
import { ExerciseDelete } from "./Components/Exercises/ExerciseDelete";
import { WorkoutDelete } from "./Components/Workouts/WorkoutDelete";
import { WorkoutEdit } from "./Components/Workouts/WorkoutEdit";
import { WorkoutInProgress } from "./Components/Workouts/WorkoutInProgress";
import { ProgressList } from "./Components/Progress/Progress";
import { ProgressDetails } from "./Components/Progress/ProgressDetails";
import { ProgressCreate } from "./Components/Progress/ProgressCreate";
import { ProgressEdit } from "./Components/Progress/ProgressEdit";
import { ProgressDelete } from "./Components/Progress/ProgressDelete";
import { Jym } from "./Components/Jym/Jym";
import { UserProfile } from "./Components/UserProfile/UserProfile";
import { BiometricsEdit } from "./Components/UserProfile/UserProfileEdit";
import { BiometricsCreate } from "./Components/UserProfile/BiometricsCreate";

export const UserView = ({ currentUser }) => {
  return (
    <Routes>
      <Route
        path=""
        element={
          <>
            <Navbar />
            <Outlet />
          </>
        }
      >
        <Route
          index
          path="/home"
          element={<Home currentUser={currentUser} />}
        />
        <Route
          path="workouts"
          element={<Workouts currentUser={currentUser} />}
        />
        <Route
          path="exercises"
          element={<Exercises currentUser={currentUser} />}
        />
        <Route
          path="workouts/create"
          element={<WorkoutCreate currentUser={currentUser} />}
        />
        <Route
          path="exercises/create"
          element={<ExerciseCreate currentUser={currentUser} />}
        />
        <Route
          path="exercises/edit/:exerciseId"
          element={<ExerciseEdit currentUser={currentUser} />}
        />
        <Route
          path="exercises/delete/:exerciseId"
          element={<ExerciseDelete currentUser={currentUser} />}
        />
        <Route
          path="workouts/delete/:workoutId"
          element={<WorkoutDelete currentUser={currentUser} />}
        />
        <Route
          path="workouts/edit/:workoutId"
          element={<WorkoutEdit currentUser={currentUser} />}
        />
        <Route
          path="workouts/inprogress/:workoutId"
          element={<WorkoutInProgress currentUser={currentUser} />}
        />
        <Route
          path="progress"
          element={<ProgressList currentUser={currentUser} />}
        />
        <Route
          path="progress/details/:exerciseId"
          element={<ProgressDetails currentUser={currentUser} />}
        />
        <Route
          path="progress/create/:exerciseId"
          element={<ProgressCreate currentUser={currentUser} />}
        />
        <Route
          path="progress/edit/:progressId"
          element={<ProgressEdit currentUser={currentUser} />}
        />
        <Route
          path="progress/delete/:progressId"
          element={<ProgressDelete currentUser={currentUser} />}
        />
        <Route path="jym" element={<Jym currentUser={currentUser} />} />
        <Route
          path="userprofile"
          element={<UserProfile currentUser={currentUser} />}
        />
        <Route
          path="userprofile/create"
          element={<BiometricsCreate currentUser={currentUser} />}
        />
        <Route
          path="userprofile/:biometricsId"
          element={<BiometricsEdit currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  );
};
