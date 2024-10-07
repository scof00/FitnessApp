export const GetWorkoutsByUserId = (userId) => {
    return fetch(`https://localhost:5001/api/Workout/userId=${userId}`).then((res) => res.json());
}

export const CreateWorkout = (w) => {
    return fetch(`https://localhost:5001/api/Workout`, {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(w)
    }).then((res) => {
        return res.json()
    }).then((workout) => {
        return workout.id
    })
};

export const GetWorkoutById = (workoutId) => {
    return fetch(`https://localhost:5001/api/Workout/${workoutId}`).then((res) => res.json());
}

export const DeleteWorkout = (workoutId) => {
    return fetch(`https://localhost:5001/api/Workout/${workoutId}`, {method: "DELETE"})
}