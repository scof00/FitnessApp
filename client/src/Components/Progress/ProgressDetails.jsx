import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  GetProgressByExerciseId,
  GetProgressByExerciseIdAsc,
} from "../../Managers/ProgressManager";
import { GetExerciseById } from "../../Managers/ExerciseManager";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import {
  ArrowLeft,
  ArrowLeftShort,
  ArrowLeftSquare,
  PencilSquare,
  PlusSquare,
  Trash,
} from "react-bootstrap-icons";
import { Accordion } from "react-bootstrap";

export const ProgressDetails = () => {
  const { exerciseId } = useParams();
  const [progress, setProgress] = useState([]);
  const [ascendingProgress, setAscendingProgress] = useState([]);
  const [exercise, setExercise] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    GetProgressByExerciseId(exerciseId).then((data) => setProgress(data));
  }, []);
  useEffect(() => {
    GetProgressByExerciseIdAsc(exerciseId).then((data) =>
      setAscendingProgress(data)
    );
  }, []);
  useEffect(() => {
    GetExerciseById(exerciseId).then((data) => setExercise(data));
  }, []);
  const dateLabels = [];
  const weightData = [];
  const weightTypeGraph = [];

  ascendingProgress.map((p) => {
    dateLabels.push(p.dateCompleted.split("T")[0]);
    weightData.push(p.weight);
    weightTypeGraph.push(p.weightType);
  });

  const data = {
    labels: dateLabels,
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

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: `Weight (${weightTypeGraph[0]})`,
        },
      },
    },
  };
  return (
    <div className="progressList">
      <div className="topButtons">
        <ArrowLeft
          size={30}
          onClick={(event) => {
            navigate("/exercises");
          }}
        />
        <PlusSquare
          size={30}
          onClick={(event) => {
            navigate(`/progress/create/${exercise.id}`);
          }}
        />
      </div>
      <h2>{exercise.name}</h2>
      <Line data={data} options={options} width={"60vw"} height={"60vw"} />
      <Accordion defaultActiveKey="0" className="accordion">
        {progress.map((p) => {
          const finalDate = p.dateCompleted.split("T")[0];
          return (
            <Accordion.Item eventKey={p.id} className="accordionItem">
              <Accordion.Header>
                <p>
                  <b>Date:</b> {finalDate}
                </p>
              </Accordion.Header>
              <Accordion.Body>
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
                <PencilSquare
                  size={20}
                  onClick={(event) => navigate(`/progress/edit/${p.id}`)}
                />
                <Trash
                  size={20}
                  onClick={(event) => navigate(`/progress/delete/${p.id}`)}
                />
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </div>
  );
};
