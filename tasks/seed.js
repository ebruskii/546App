//import { closeConnection, dbConnection } from '../config/mongoConnection.js';
import workoutFuncs from "../data/workouts.js";
import challengesData from "../data/challenges.js";
import userData from "../data/users.js";
import achievementsData from "../data/achievements.js";
// try{
//     const db = await dbConnection();
//     await db.dropDatabase();
// }catch(e){
//     console.log(e);
// }

const mockChallenges = [
  {
    title: "Run 5K",
    description: "Complete a 5K run",
    goal: "5000",
    unit: "meters",
    type: "Running",
    creator: "Admin",
  },
  {
    title: "Bike 10 Kilometers",
    description: "Go on a 10K bike ride",
    goal: "10",
    unit: "kilometers",
    type: "Biking",
    creator: "Admin",
  },
  {
    title: "Swim 1 Kilometer",
    description: "Swim a total of one kilometer",
    goal: "1",
    unit: "kilometers",
    type: "Swimming",
    creator: "Admin",
  },
];

const mockUsers = [
  {
    email: "alice@example.com",
    password: "Password123!",
    firstName: "Alice",
    lastName: "Johnson",
    city: "New York",
    state: "NY",
    age: 25,
    gender: "Female",
  },
  {
    email: "bob@example.com",
    password: "Password123!",
    firstName: "Bob",
    lastName: "Smith",
    city: "Chicago",
    state: "IL",
    age: 30,
    gender: "Male",
  },
  {
    email: "carol@example.com",
    password: "Password123!",
    firstName: "Carol",
    lastName: "Williams",
    city: "Los Angeles",
    state: "CA",
    age: 28,
    gender: "Female",
  },
  {
    email: "dave@example.com",
    password: "Password123!",
    firstName: "Dave",
    lastName: "Brown",
    city: "Miami",
    state: "FL",
    age: 32,
    gender: "Male",
  },
  {
    email: "emma@example.com",
    password: "Password123!",
    firstName: "Emma",
    lastName: "Davis",
    city: "Seattle",
    state: "WA",
    age: 29,
    gender: "Female",
  },
  {
    email: "frank@example.com",
    password: "Password123!",
    firstName: "Frank",
    lastName: "Wilson",
    city: "Austin",
    state: "TX",
    age: 27,
    gender: "Male",
  },
];

const mockWorkouts = [
  {
    title: "Morning Run",
    amountOfWorkout: 5,
    unitOfWorkout: "kilometers",
    duration: 30,
    type: "Running",
    creator: "alice@example.com",
  },
  {
    title: "Evening Yoga",
    amountOfWorkout: 150,
    unitOfWorkout: "calories",
    duration: 60,
    type: "Yoga",
    creator: "bob@example.com",
  },
  {
    title: "Gym Session",
    amountOfWorkout: 500,
    unitOfWorkout: "calories",
    duration: 120,
    type: "Gym",
    creator: "carol@example.com",
  },
  {
    title: "Afternoon Biking",
    amountOfWorkout: 20,
    unitOfWorkout: "kilometers",
    duration: 90,
    type: "Biking",
    creator: "dave@example.com",
  },
  {
    title: "Lunchtime Tennis",
    amountOfWorkout: 300,
    unitOfWorkout: "calories",
    duration: 45,
    type: "Tennis",
    creator: "emma@example.com",
  },
  {
    title: "Morning Swimming",
    amountOfWorkout: 1000,
    unitOfWorkout: "meters",
    duration: 30,
    type: "Swimming",
    creator: "frank@example.com",
  },
];

async function seedDatabase() {
  try {
    const existingChallenges = await challengesData.getAllChallenges();
    if (existingChallenges.length === 0) {
      for (const challenge of mockChallenges) {
        await challengesData.createChallenge(
          challenge.title,
          challenge.description,
          challenge.type,
          challenge.unit,
          challenge.goal,
          challenge.creator
        );
        console.log(`Challenge created: ${challenge.title}`);
      }
      console.log("All mock challenges have been added.");
    } else {
      console.log("Challenges already exist. No mock data added.");
    }

    const existingUsers = await userData.getAllUsers();
    if (existingUsers.length > 0) {
      console.log(
        "Users already exist in the database. No new mock users will be added."
      );
    } else {
      for (const user of mockUsers) {
        const result = await userData.createUser(
          user.email,
          user.password,
          user.firstName,
          user.lastName,
          user.city,
          user.state,
          user.age,
          user.gender
        );
        console.log(`User ${user.email} added successfully:`, result);
      }

      for (const workout of mockWorkouts) {
        const workoutResult = await userData.createWorkout(
          workout.title,
          workout.amountOfWorkout,
          workout.unitOfWorkout,
          workout.duration,
          workout.type,
          workout.creator
        );
        console.log(`Workout '${workout.title}' added for ${workout.creator}`);
      }

      await userData.addFriend(mockUsers[0].email, mockUsers[1].email);
      await userData.addFriend(mockUsers[1].email, mockUsers[2].email);
      await userData.addFriend(mockUsers[0].email, mockUsers[2].email);

      await workoutFuncs.createWorkoutType("Running", ["kilometers", "meters"]);
      await workoutFuncs.createWorkoutType("Biking", ["kilometers", "meters"]);
      await workoutFuncs.createWorkoutType("Swimming", ["meters"]);
      await workoutFuncs.createWorkoutType("Tennis", ["calories"]);
      await workoutFuncs.createWorkoutType("Yoga", ["calories"]);
      await workoutFuncs.createWorkoutType("Gym", ["calories"]);
      console.log("All users have been added and friendships established.");

    }
  } catch (error) {
    console.error("An error occurred while seeding the database:", error);
  }
  const achievements = await achievementsData.getAllAchievements();
  if(achievements.length === 0){
    const achievementId1 = await achievementsData.createAchievement(
        "New User",
        "Log in for the first time",
        1,
        "Login Streak",
        "count"
      );
      const achievementId2 = await achievementsData.createAchievement(
        "100K Run Club",
        "Run 100 kilometers in total",
        100,
        "Running",
        "kilometers"
      );
      const achievementId3 = await achievementsData.createAchievement(
        "200K Bike Club",
        "Bike 10 kilometers in total",
        200,
        "Biking",
        "kilometers"
      );
      const achievementId4 = await achievementsData.createAchievement(
        "5K Swim Club",
        "Swim 5000 meters in total",
        5000,
        "Swimming",
        "meters"
      );
      const achievementId5 = await achievementsData.createAchievement(
        "Tennis Pro",
        "Burn 5000 calories playing tennis",
        5000,
        "Tennis",
        "calories"
      );
      const achievementId6 = await achievementsData.createAchievement(
        "Yoga Master",
        "Burn 1000 calories doing yoga",
        1000,
        "Yoga",
        "calories"
      );
      const achievementId7 = await achievementsData.createAchievement(
        "Gym Rat",
        "Burn 10000 calories at the gym",
        10000,
        "Gym",
        "calories"
      );
      console.log("All achievements have been added.")
  }else{
    console.log("Achievements already exist. No mock data added.")
  }
}

seedDatabase();

// try
// {await closeConnection();}
// catch(e){
//   console.log(e)
// }
