export const GetExerciseByUserId = async (userId) => {
    return await fetch(`https://localhost:5001/api/Exercise/userId=${userId}`).then((res) => res.json());
}

export const createExercise = async (e) => {
    return await fetch(`https://localhost:5001/api/Exercise`, {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body:JSON.stringify(e)
    })
}

export const createStarterExercise = async (e) => {
    return await fetch(`https://localhost:5001/api/Exercise`, {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body:JSON.stringify(e)
    }).then((res) => {
        return res.json()
    }).then((exercise) => {
        return exercise.id
    })
}

export const GetExerciseById = async (id) => {
    return await fetch(`https://localhost:5001/api/Exercise/${id}`).then((res) => res.json())
}

export const updateExercise = async (e) => {
    return await fetch(`https://localhost:5001/api/Exercise/${e.id}`, {
        method: "PUT",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(e)
    })
}

export const deleteExercise = async (id) => {
    return await fetch(`https://localhost:5001/api/Exercise/${id}`, {method:"DELETE"})
}