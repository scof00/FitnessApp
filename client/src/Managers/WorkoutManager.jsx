export const GetWorkoutsByUserId = async (userId) => {
    return await fetch(`https://localhost:5001/api/Workout/userId=${userId}`).then((res) => res.json());
}

export const CreateWorkout = async (w) => {
    return await fetch(`https://localhost:5001/api/Workout`, {
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

export const GetWorkoutById = async (workoutId) => {
    return await fetch(`https://localhost:5001/api/Workout/${workoutId}`).then((res) => res.json());
}

export const DeleteWorkout = async (workoutId) => {
    return await fetch(`https://localhost:5001/api/Workout/${workoutId}`, {method: "DELETE"})
}

export const updateWorkout = async (w) => {
    return await fetch(`https://localhost:5001/api/Workout/${w.id}`, {
        method: "PUT",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(w)
    })
}