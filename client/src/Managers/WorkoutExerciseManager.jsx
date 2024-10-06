export const getExerciseByWorkoutId = (id) => {
    return fetch(`https://localhost:5001/api/WorkoutExercise/workoutId=${id}`).then((res) => res.json())
}

export const getWorkoutExercise = () => {
    return fetch(`https://localhost:5001/api/WorkoutExercise`).then((res) => res.json())
}