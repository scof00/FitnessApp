export const GetBiometricsByUserId = (id) => {
    return fetch(`https://localhost:5001/api/Biometrics/userId=${id}`).then((res) => res.json())
}

export const updateBiometrics = (b) => {
    return fetch(`https://localhost:5001/api/Biometrics/${b.id}`, {
        method: "PUT",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(b)
    })
}