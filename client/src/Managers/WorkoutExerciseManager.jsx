export const getExerciseByWorkoutId = (id) => {
    return fetch(`https://localhost:5001/api/WorkoutExercise/workoutId=${id}`).then((res) => res.json())
}

export const getWorkoutExercise = () => {
    return fetch(`https://localhost:5001/api/WorkoutExercise`).then((res) => res.json())
}

export const CreateWorkoutExercise = (we) => {
    return fetch(`https://localhost:5001/api/WorkoutExercise`, {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(we),
    });
};

export const DeleteByWorkoutId = (id) => {
    return fetch(`https://localhost:5001/api/WorkoutExercise/workoutId=${id}`, {method: "DELETE"})
}

export const DeleteWorkoutExercise = (id) => {
    return fetch(`https://localhost:5001/api/WorkoutExercise/${id}`, {method: "DELETE"})
}

export const DeleteWorkoutExerciseByExerciseId = (id) => {
    return fetch(`https://localhost:5001/api/WorkoutExercise/exerciseId=${id}`, {method: "DELETE"})
}