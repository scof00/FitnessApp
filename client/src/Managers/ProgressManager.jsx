export const CreateProgress = (p) => {
    return fetch(`https://localhost:5001/api/Progress`, {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body:JSON.stringify(p)
    })
}

export const GetProgressByUserId = (userId) => {
    return fetch(`https://localhost:5001/api/Progress/userId=${userId}`).then((res) => res.json());
}

export const GetProgressByExerciseId = (id) => {
    return fetch(`https://localhost:5001/api/Progress/exerciseId=${id}`).then((res) => res.json());
}

export const DeleteByExerciseId = (id) => {
    return fetch(`https://localhost:5001/api/Progress/exerciseid=${id}`, {method:"DELETE"})
}