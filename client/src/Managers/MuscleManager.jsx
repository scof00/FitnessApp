export const getMuscles = async () => {
    return await fetch(`https://localhost:5001/api/MuscleGroup`).then((res) => res.json());
}