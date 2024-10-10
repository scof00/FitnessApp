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

export const GetProgressByExerciseIdAsc = (id) => {
    return fetch(`https://localhost:5001/api/Progress/exerciseId=${id}/Asc`).then((res) => res.json());
}

export const DeleteByExerciseId = (id) => {
    return fetch(`https://localhost:5001/api/Progress/exerciseid=${id}`, {method:"DELETE"})
}

export const GetProgressById = (id) => {
    return fetch(`https://localhost:5001/api/Progress/${id}`).then((res) => res.json());
}

export const DeleteProgress = (id) => {
    return fetch(`https://localhost:5001/api/Progress/${id}`, {method:"DELETE"})
}

export const updateProgress = (p) => {
    return fetch(`https://localhost:5001/api/Progress/${p.id}`, {
        method: "PUT",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(p)
    })
}

export const GetLatestByExerciseId = (id) => {
    return fetch(`https://localhost:5001/api/Progress/latest/exerciseId=${id}`).then((res) => res.json());
}