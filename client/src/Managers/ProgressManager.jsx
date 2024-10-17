export const CreateProgress = async (p) => {
    return await fetch(`https://localhost:5001/api/Progress`, {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body:JSON.stringify(p)
    })
}

export const GetProgressByUserId = async (userId) => {
    return await fetch(`https://localhost:5001/api/Progress/userId=${userId}`).then((res) => res.json());
}

export const GetProgressByExerciseId = async (id) => {
    return await fetch(`https://localhost:5001/api/Progress/exerciseId=${id}`).then((res) => res.json());
}

export const GetProgressByExerciseIdAsc = async (id) => {
    return await fetch(`https://localhost:5001/api/Progress/exerciseId=${id}/Asc`).then((res) => res.json());
}

export const DeleteByExerciseId = async (id) => {
    return await fetch(`https://localhost:5001/api/Progress/exerciseid=${id}`, {method:"DELETE"})
}

export const GetProgressById = async (id) => {
    return await fetch(`https://localhost:5001/api/Progress/${id}`).then((res) => res.json());
}

export const DeleteProgress = async (id) => {
    return await fetch(`https://localhost:5001/api/Progress/${id}`, {method:"DELETE"})
}

export const updateProgress = async (p) => {
    return await fetch(`https://localhost:5001/api/Progress/${p.id}`, {
        method: "PUT",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(p)
    })
}

export const GetLatestByExerciseId = async (id) => {
    return await fetch(`https://localhost:5001/api/Progress/latest/exerciseId=${id}`).then((res) => res.json());
}