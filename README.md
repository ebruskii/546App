FlexFusion App README

Overview
FlexFusion is a dynamic web application designed for fitness enthusiasts to track workouts, participate in fitness challenges, and connect with friends to motivate each other. The app allows users to log workouts, join challenges, see their progress, and interact with their fitness community.

Features
User Registration and Login: Secure authentication system for user registration and login.
Workout Logging: Users can log various types of workouts, specifying the type, duration, and other relevant details.
Challenges: Users can join challenges set by the app or by other users, which are goal-oriented (e.g., run 100 km in a month).
Leaderboard: Challenge leaderboards show rankings based on the challenge criteria.
Social Interaction: Users can add friends, compare progress, and motivate each other.
Progress Tracking: Users can view their progress over time through detailed statistics and workout histories.
Prerequisites

Before running the FlexFusion app, ensure you have the following completed:

The seed file is important for initializing the database with mock data for testing and development purposes. Ensure that your database is empty before running the seed to prevent duplicate entries and potential conflicts. run using the folwoing command
npm run seed
This command runs a script defined in package.json that executes the seed file. The seed script populates the database with initial data for users, workouts, challenges, and other necessary entities.
Running the Application
After seeding the database, you can start the application:

npm start
This command runs the app.js file, starting your Node.js server. Navigate to http://localhost:3000 in your web browser to access the FlexFusion app.
