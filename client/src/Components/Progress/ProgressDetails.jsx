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
import { Tooltip } from "reactstrap";

export const ProgressDetails = () => {
  const { exerciseId } = useParams();
  const [progress, setProgress] = useState([]);
  const [ascendingProgress, setAscendingProgress] = useState([]);
  const [exercise, setExercise] = useState({});
  const [toolTipOpen1, setToolTipOpen1] = useState(false);
  const [toolTipOpen2, setToolTipOpen2] = useState(false);
  const [toolTipOpen3, setToolTipOpen3] = useState(false);
  const [toolTipOpen4, setToolTipOpen4] = useState(false);
  const toggle1 = () => setToolTipOpen1(!toolTipOpen1);
  const toggle2 = () => setToolTipOpen2(!toolTipOpen2);
  const toggle3 = () => setToolTipOpen3(!toolTipOpen3);
  const toggle4 = () => setToolTipOpen4(!toolTipOpen4);
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
    <div className="progressList, coreComponent">
      <div className="topButtons">
        <ArrowLeft
          size={30}
          onClick={(event) => {
            navigate("/exercises");
          }}
          id="backTarget"
        />
        <Tooltip
          isOpen={toolTipOpen1}
          target="backTarget"
          toggle={toggle1}
          placement="top"
        >
          Back
        </Tooltip>
        <PlusSquare
          size={30}
          onClick={(event) => {
            navigate(`/progress/create/${exercise.id}`);
          }}
          id="addTarget"
        />
        <Tooltip
          isOpen={toolTipOpen4}
          target="addTarget"
          toggle={toggle4}
          placement="top"
        >
          Add Progress Update
        </Tooltip>
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
                  id="editTarget"
                />
                <Tooltip
                  isOpen={toolTipOpen2}
                  target="editTarget" // Tooltip target matches the Play icon id
                  toggle={toggle2}
                  placement="top" // You can adjust placement as needed
                >
                  Edit
                </Tooltip>
                <Trash
                  size={20}
                  onClick={(event) => navigate(`/progress/delete/${p.id}`)}
                  id="deleteTarget"
                />
                <Tooltip
                  isOpen={toolTipOpen3}
                  target="deleteTarget" // Tooltip target matches the Play icon id
                  toggle={toggle3}
                  placement="top" // You can adjust placement as needed
                >
                  Delete
                </Tooltip>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </div>
  );
};
