import React, { useEffect, useState } from "react";
import "./Jym.css"; // Import the CSS file for styling
import { CreateWorkout } from "../../Managers/WorkoutManager";
import { createStarterExercise, GetExerciseByUserId } from "../../Managers/ExerciseManager";
import { CreateWorkoutExercise } from "../../Managers/WorkoutExerciseManager";
import { json, useNavigate } from "react-router-dom";

export const Jym = ({ currentUser }) => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedExercises, setSuggestedExercises] = useState([]); // To store exercises
  const [suggestedWorkoutName, setSuggestedWorkoutName] = useState(""); // To store workout name
  const [confirmWorkoutCreation, setConfirmWorkoutCreation] = useState(false);
  const [userExercises, setUserExercises] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    GetExerciseByUserId(currentUser.id).then((data) => setUserExercises(data))
  },[])

  const chatGptPrompt = `
  Please create a workout plan with a workout name and a list of exercises. 
  For muscle group, here are the options (without comments): [
  {
    "id": 1,
    "name": "Chest"
  },
  {
    "id": 2,
    "name": "Back"
  },
  {
    "id": 3,
    "name": "Legs"
  },
  {
    "id": 4,
    "name": "Biceps"
  },
  {
    "id": 5,
    "name": "Triceps"
  },
  {
    "id": 6,
    "name": "Shoulders"
  },
  {
    "id": 7,
    "name": "Abs"
  },
  {
    "id": 8,
    "name": "Cardio & Others"
  }
]
  Format the response like this (without comments): 
  {
    "workout_name": "Workout Name",
    "exercises": [ {
        "name": "Exercise Name",
        "sets": Number of sets (e.g. 3),
        "reps": Number of reps per set (e.g. 12),
        "weight": Weight to use in pounds or kilograms (e.g. 50kg or bodyweight),
        "muscleGroup": Dominant muscle group Id that the exercise targets (limit 1)
      },
       {
        "name": "Exercise Name",
        "sets": Number of sets (e.g. 3),
        "reps": Number of reps per set (e.g. 12),
        "weight": Weight to use in pounds or kilograms (e.g. 50kg or bodyweight),
        "muscleGroup": Dominant muscle group Id that the exercise targets (limit 1)
      }],
      "confirmationMessage": "Do you want me to create this workout for you? If so respond with: Create this Workout."
  }`;
  const handleChatGptResponse = (message) => {
    console.log("Raw ChatGPT Response:", message);
    try {
      
      const parsedResponse = JSON.parse(message); // Parse the response as JSON
      const workoutName = parsedResponse.workout_name;
      const exercises = parsedResponse.exercises;
      const confirmationMessage = parsedResponse.confirmation;
  
      // Set the state for workout name and suggested exercises
      setSuggestedWorkoutName(workoutName);
      setSuggestedExercises(exercises);
  
      // Log the values in a useEffect to check if they update correctly
      console.log('Suggested Workout Name:', workoutName);
      console.log('Suggested Exercises:', exercises);
    } catch (error) {
      console.error("Error parsing ChatGPT response:", error, "Response content:", message);
    }
  };
  
  // Add a useEffect to monitor changes in suggestedWorkoutName and suggestedExercises
  useEffect(() => {
    console.log('Updated Workout Name:', suggestedWorkoutName);
    console.log('Updated Exercises:', suggestedExercises);
  }, [suggestedWorkoutName, suggestedExercises]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText) return;
    if(inputText === "Create this Workout"){
      const newWorkout = {
        name: suggestedWorkoutName,
        userId: currentUser.id,
      };
      console.log(newWorkout)
      CreateWorkout(newWorkout).then((workoutId) => {
        if (workoutId) {
          const exercisePromises = suggestedExercises.map(async (exercise) => {
            // Check if the exercise already exists for the user
            const existingExercise = userExercises.find(ue => ue.name === exercise.name);
            
            if (existingExercise) {
              // If it exists, create a bridge table entry
              return CreateWorkoutExercise({
                workoutId: workoutId,
                exerciseId: existingExercise.id,
              });
            } else {
              // If it doesn't exist, create the new exercise
              const newExercise = {
                muscleId: exercise.muscleGroup,
                name: exercise.name,
                userId: currentUser.id,
              };
              const exerciseId = await createStarterExercise(newExercise);
              if (exerciseId) {
                // Create the bridge table entry for the new exercise
                return CreateWorkoutExercise({
                  workoutId: workoutId,
                  exerciseId: exerciseId,
                });
              }
            }
          });
  
          // Wait for all promises to resolve
          // await Promise.all(exercisePromises);
          navigate("/home");
        }
          
      //     suggestedExercises.map((exercises) => {
      //       userExercises.some((ue) => {
      //         if(ue.name === exercises.name){
      //           const workoutExercise ={
      //             workoutId: workoutId,
      //             exerciseId:ue.id
      //           }
      //           CreateWorkoutExercise(workoutExercise)
      //         } else{
      //           const newExercise = {
      //             muscleId: exercises.muscleGroup,
      //             name: exercises.name,
      //             userId: currentUser.id,
      //           };
      //           createStarterExercise(newExercise).then((exerciseId) => {
      //             if (exerciseId) {
      //               const workoutExercise = {
      //                 workoutId: workoutId,
      //                 exerciseId: exerciseId,
      //               };
      //               CreateWorkoutExercise(workoutExercise);
      //             }
      //           });

      //         }
      //       })
      //     });
      //   }
      // }).then(navigate("/home")
    })
    } else if (inputText.includes("make a workout") || inputText.includes("create a workout") || inputText.includes("Create a workout") || inputText.includes("Make a workout")){
      
      
      // Add user's message to the message thread
      setMessages((prev) => [...prev, { role: "user", content: inputText }]);
      setIsLoading(true);
      setInputText(""); // Clear input field
      
      try {
        const response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
              model: "gpt-4o-mini",
              messages: [
                {
                  role: "user",
                  content: inputText + chatGptPrompt,
                },
            ],
          }),
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.choices && data.choices.length > 0) {
        // Add ChatGPT's response to the message thread
        const chatGptMessage = data.choices[0]?.message?.content?.trim();
        const parsedResponse = JSON.parse(chatGptMessage); // Parse the response as JSON
      const workoutName = parsedResponse.workout_name;
      const exercises = parsedResponse.exercises;
      let finalDisplayString = `Workout: ${workoutName}.`
       exercises.forEach(e => {
        finalDisplayString +=` Exercise: ${e.name}, Sets: ${e.sets}, Repetitions: ${e.reps}, Weight: ${e.weight}.`
      })
      console.log(exercises)
      finalDisplayString +=` Would you like me to create this workout for you? Confirm by typing: Create this Workout`
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: finalDisplayString},
        ]);
        
        // Extract workout details from ChatGPT response
        handleChatGptResponse(chatGptMessage);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Error: No response from API." },
        ]);
      }
    } catch (error) {
      console.error("Error fetching response from OpenAI:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Error: Could not fetch response. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }
    else {

      
      // Add user's message to the message thread
      setMessages((prev) => [...prev, { role: "user", content: inputText }]);
      setIsLoading(true);
      setInputText(""); // Clear input field
      
      try {
        const response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
              model: "gpt-4o-mini",
              messages: [
                {
                  role: "user",
                  content: inputText
                },
            ],
          }),
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.choices && data.choices.length > 0) {
        // Add ChatGPT's response to the message thread
        const chatGptMessage = data.choices[0]?.message?.content?.trim();
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: chatGptMessage },
        ]);
        
        // Extract workout details from ChatGPT response
        handleChatGptResponse(chatGptMessage);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Error: No response from API." },
        ]);
      }
    } catch (error) {
      console.error("Error fetching response from OpenAI:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Error: Could not fetch response. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };
}

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <span>{msg.content}</span>
          </div>
        ))}
      </div>
      <form className="input-container" onSubmit={handleSubmit}>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message here..."
          rows={2}
          required
        />
        <button type="submit" className="exerciseButton" disabled={isLoading}>
          {isLoading ? "Loading..." : "Send"}
        </button>
      </form>
    </div>
  );
};
