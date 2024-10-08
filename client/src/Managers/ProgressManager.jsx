export const CreateProgress = (p) => {
    return fetch(`https://localhost:5001/api/Progress`, {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body:JSON.stringify(p)
    })
}