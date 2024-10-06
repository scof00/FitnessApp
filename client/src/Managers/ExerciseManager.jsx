export const GetExerciseByUserId = (userId) => {
    return fetch(`https://localhost:5001/api/Exercise/userId=${userId}`).then((res) => res.json());
}

export const createExercise = (e) => {
    return fetch(`https://localhost:5001/api/Exercise`, {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body:JSON.stringify(e)
    })
}

export const GetExerciseById = (id) => {
    return fetch(`https://localhost:5001/api/Exercise/${id}`).then((res) => res.json())
}

export const updateExercise = (e) => {
    return fetch(`https://localhost:5001/api/Exercise/${e.id}`, {
        method: "PUT",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(e)
    })
}