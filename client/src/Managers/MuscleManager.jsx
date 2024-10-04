export const getMuscles = () => {
    return fetch(`https://localhost:5001/api/MuscleGroup`).then((res) => res.json());
}