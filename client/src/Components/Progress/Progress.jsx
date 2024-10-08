import { useEffect, useState } from "react"
import { GetProgressByUserId } from "../../Managers/ProgressManager";
import { ExercisesForProgress } from "../Exercises/ExercisesForProgress";
import "./Progress.css"

export const ProgressList = ({currentUser}) => {

    return(
        <div className="progressList">
            <h2>Click an exercise to view your progress!</h2>
            <ExercisesForProgress currentUser={currentUser}/>
        </div>
    )
}