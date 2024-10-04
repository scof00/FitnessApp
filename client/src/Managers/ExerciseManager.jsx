export const GetExerciseByUserId = (userId) => {
    return fetch(`https://localhost:5001/api/Exercise/userId=${userId}`).then((res) => res.json());
}