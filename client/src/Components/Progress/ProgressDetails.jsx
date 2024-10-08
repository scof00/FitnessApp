import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetProgressByExerciseId } from "../../Managers/ProgressManager";
import { GetExerciseById } from "../../Managers/ExerciseManager";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import {
  ArrowLeftShort,
  ArrowLeftSquare,
  PlusSquare,
} from "react-bootstrap-icons";

export const ProgressDetails = () => {
  const { exerciseId } = useParams();
  const [progress, setProgress] = useState([]);
  const [exercise, setExercise] = useState({});

  useEffect(() => {
    GetProgressByExerciseId(exerciseId).then((data) => setProgress(data));
  }, []);
  useEffect(() => {
    GetExerciseById(exerciseId).then((data) => setExercise(data));
  }, []);
  const dateLabels = [];
  const weightData = [];
  progress.map((p) => {
    dateLabels.push(p.dateCompleted);
    weightData.push(p.weight);
  });
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: `${exercise.name}`,
        data: weightData,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };
  return (
    <div className="progressList">
      <div>
        <ArrowLeftSquare />
        <PlusSquare />
      </div>
      <h2>{exercise.name}</h2>
      <Line data={data} />
      {progress.map((p) => {
        return (
          <div className="progressDisplay">
            <div>
              <p>
                <b>Date:</b> {p.dateCompleted}
              </p>
            </div>
            <div className="progressChild">
              <p>
                <b>Sets:</b> {p.sets} <b>Reps:</b> {p.reps}
              </p>
            </div>
            <div className="progressChild">
              <p>
                <b>Weight:</b> {p.weight} {p.weightType}
              </p>
            </div>
            <p>
              <b>Notes:</b> {p.notes}
            </p>
          </div>
        );
      })}
    </div>
  );
};
