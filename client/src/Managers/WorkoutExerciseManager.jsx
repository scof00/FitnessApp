export const getExerciseByWorkoutId = async (id) => {
    return await fetch(`https://localhost:5001/api/WorkoutExercise/workoutId=${id}`).then((res) => res.json())
}

export const getWorkoutExercise = async () => {
    return await fetch(`https://localhost:5001/api/WorkoutExercise`).then((res) => res.json())
}

export const CreateWorkoutExercise = async (we) => {
    return await fetch(`https://localhost:5001/api/WorkoutExercise`, {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(we),
    });
};

export const DeleteByWorkoutId = async (id) => {
    return await fetch(`https://localhost:5001/api/WorkoutExercise/workoutId=${id}`, {method: "DELETE"})
}

export const DeleteWorkoutExercise = async (id) => {
    return await fetch(`https://localhost:5001/api/WorkoutExercise/${id}`, {method: "DELETE"})
}

export const DeleteWorkoutExerciseByExerciseId = async (id) => {
    return await fetch(`https://localhost:5001/api/WorkoutExercise/exerciseId=${id}`, {method: "DELETE"})
}