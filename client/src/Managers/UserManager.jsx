const apiUrl = "https://localhost:5001";
const profileBase = `${apiUrl}/api/User`;

// Update login function to include error handling
export const login = async (username, password) => {
    return await fetch(`${apiUrl}/api/User/GetByUsernameAndPassword?username=${username}&password=${password}`).then((r) => {
        if(!r.ok) {
            throw new Error("Login Failed")
        }
        return r.json();
    })
    .then((userprofile) => {
        localStorage.setItem("FitnessAppUser", JSON.stringify(userprofile));
        return userprofile;
    })
}

export const logout = () => {
    localStorage.clear();
}

export const CreateUser = async (u) => {
    return await fetch(`${apiUrl}/api/User`, {
        method:"POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(u)
    }).then((res) => {
        return res.json()
    }).then((user) => {
        return user.id
    })
}

export const GetAllUsers = async () => {
    return await fetch(`https://localhost:5001/api/User`).then((res) => res.json());
}
