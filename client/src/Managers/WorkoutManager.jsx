export const GetWorkoutsByUserId = (userId) => {
    return fetch(`https://localhost:5001/api/Workout/userId=${userId}`).then((res) => res.json());
}