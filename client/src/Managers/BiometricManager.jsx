export const GetBiometricsByUserId = async (id) => {
    return await fetch(`https://localhost:5001/api/Biometrics/userId=${id}`).then((res) => res.json())
}

export const updateBiometrics = async (b) => {
    return await fetch(`https://localhost:5001/api/Biometrics/${b.id}`, {
        method: "PUT",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(b)
    })
}

export const CreateBiometrics = async (b) => {
        return await fetch(`https://localhost:5001/api/Biometrics`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body:JSON.stringify(b)
        })
}