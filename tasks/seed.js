import workoutFuncs from "../data/workouts.js";
import challengesData from "../data/challenges.js";
import userData from "../data/users.js";

const mockChallenges = [
  {
    title: "Run 5K",
    description: "Complete a 5K run",
    goal: "5000 meters",
    type: "Running",
    creator: "Admin",
  },
  {
    title: "Bike 10 Miles",
    description: "Go on a 10-mile bike ride",
    goal: "10 miles",
    type: "Biking",
    creator: "Admin",
  },
  {
    title: "Swim 1 Mile",
    description: "Swim a total of one mile",
    goal: "1 mile",
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
];

const mockWorkouts = [
  {
    title: "Morning Run",
    amountOfWorkout: 5,
    unitOfWorkout: "kilometers",
    duration: 30,
    type: "Cardio",
    creator: "alice@example.com",
  },
  {
    title: "Evening Yoga",
    amountOfWorkout: 1,
    unitOfWorkout: "hour",
    duration: 60,
    type: "Flexibility",
    creator: "bob@example.com",
  },
  {
    title: "Gym Session",
    amountOfWorkout: 2,
    unitOfWorkout: "hours",
    duration: 120,
    type: "Strength",
    creator: "carol@example.com",
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
          challenge.goal,
          challenge.type,
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

      console.log("All users have been added and friendships established.");
    }
  } catch (error) {
    console.error("An error occurred while seeding the database:", error);
  }
}

seedDatabase();
