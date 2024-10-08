import { useEffect, useState } from "react"
import { useMatch, useNavigate, useParams } from "react-router-dom";
import { DeleteProgress, GetProgressById } from "../../Managers/ProgressManager";

export const ProgressDelete = () => {
    const [ progress, setProgress] = useState({});
    const {progressId} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        GetProgressById(progressId).then((data) => setProgress(data))
    }, [])

    const handleDelete = () => {
        DeleteProgress(progressId).then(navigate(`/progress/details/${progress.exerciseId}`))
    }


    return(
        <>
      <div className="exerciseDeleteForm">
        Are you sure you want to delete the following information:
        <p>
          <b>Date:</b> {progress.dateCompleted}
        </p>
        <p>
          <b>Sets:</b> {progress.sets}
        </p>
        <p>
          <b>Reps:</b> {progress.reps}
        </p>
        <p>
          <b>Weight:</b> {progress.weight} {progress.weightType}
        </p>
        <p>
          <b>Notes:</b> {progress.notes}
        </p>
        <p>You will not be able to recover this data after you delete it.</p>
        <button
          onClick={() => handleDelete()}
          type="submit"
          className="btn mt-4 btn-danger mx-1 text-white"
        >
          Delete
        </button>
        <button
          onClick={() => navigate(`/progress/details/${progress.exerciseId}`)}
          className="btn mt-4 btn-outline-primary mx-1 text-primary"
        >
          Cancel
        </button>
      </div>
    </>
    )
}