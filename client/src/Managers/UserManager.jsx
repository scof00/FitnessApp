const apiUrl = "https://localhost:5001";
const profileBase = `${apiUrl}/api/User`;

// Update login function to include error handling
export const login = (username, password) => {
    return fetch(`${apiUrl}/api/User/GetByUsernameAndPassword?username=${username}&password=${password}`).then((r) => {
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