# trAIner

## Demonstration

Link to full screen demonstration: [Full Screen](https://drive.google.com/file/d/1FSM-QYlTOSM1LfZd1LW37HqgidrRV5gV/view?usp=sharing)
Link to phone screen demonstration: [Phone Screen](https://drive.google.com/file/d/1d5jACuU7_O6byEllkAlBsVGmtMl4iFKT/view?usp=sharing)

## Setup

1. Clone this repository.
1. `cd` into the directory it creates.
1. Run `start FitnessApp.sln`. This will open the files relevant to your database in Visual Studio 2022 (the purple one).
1. Run the files inside of the SQL folder labeled `FitnessApp_Create_DB.sql` and `FitnessApp_SeedData.sql`.
1. In your terminal, cd into the subdirectory labeled `client`.
1. Run `ls` to ensure you are on the same level as the `package-lock.json` file.
1. Run `npm run dev` and then open the localhost link in your browser.
1. In Visual Studio 2022 (the purple one), click the solid green `Run` arrow in the top middle of your screen. This will pull up `swagger` in a new window. Leave this open and return to the localhost for React.

***Please note that the AI functionality is dependent on an OpenAI API Key. If you would like to test it out for yourself, you will need to use your own in a .env file.***

## What is trAIner?

trAIner is a fitness tracking application with an AI personal trainer. You can:
* Create and login as a new user.
* Create, edit, and delete exercises.
* Categorize your exercises by what muscle group they target to make them easy to locate.
* Create, edit, and delete workout playlists.
* Receive recommendations for working out, matched to your fitness goals.
* Automatically record your progress after completing a workout.
* See and manage your progress, log old records from before you started using the app, and see your progress displayed graphically to easily analyze your data.
* Manage your age, height, and weight, as well as determine your recommended daily calorie intake, determined by activity level.
* New to working out? Talk to Jym, our AI personal trainer who can give you tips and guidance to working out, as well as creating exercises and workout playlists for you!

## How to use?

1. Start by clicking register, and filling out the forms for your username and password.
    * Username already taken? Just user another one.
2. After creating a new account, you'll be redirected to the login screen. Put in your information to login.
3. As a new user, you will have a few exercises and a workout already created for you to help you get started. Click on either workouts or exercises to see these.
4. Want to create new exercises? Click on the `Exercises` button in the navbar. Click the `plus` button in the top right corner to add a new exercise.
5. Want to create a new workout? Click on the `Workouts` button in the navbar. Click the `plus` button in the top right corner to create a new one, or edit an existing one. 
6. When you're ready to workout, click the `start` button in the bottom left of any workout. Add the relevant information as you workout, and click `Finish workout` at the bottom of the screen when you're finished.
7. Want to view your progress or add past data? Go bac kto `Exercises` and click the `Progress` button on any exercises. Here, all of your data for a specific exercise is stored for you to view, edit, delete, or add your own.
8. Click on `Profile` to add information on your age, height, and weight. Watch as it calculates your recommended daily calories for you.
9. Brand new to working out and need help? Click on the `Jym` icon in the navbar and ask Jym to help out. Asking Jym to "make a workout" or "create a workout" for your will prompt Jym  to do just that. If it looks good, confirm by typing "Create this Workout". Stand back and let Jym do the work for you.
    * ***This only works if you have your own OpenAI API set up in a .env file.*** 
