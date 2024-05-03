import helpers from "../helpers.js";
import { users, workouts } from "../config/mongoCollections.js";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
const exports = {
  // create user
  // updated new
  async createUser(
    email,
    password,
    firstName,
    lastName,
    city,
    state,
    age,
    gender
  ) {
    email = helpers.isValidEmail(email);
    password = helpers.isValidPassword(password);
    firstName = helpers.isValidString(firstName, "first name");
    lastName = helpers.isValidString(lastName, "last name");
    city = helpers.isValidString(city, "city");
    state = helpers.isValidState(state);
    age = helpers.isValidInt(age, "age");
    if (age < 16 || age > 100) {
      throw "Error: age must be between 16 and 100";
    }
    gender = helpers.isValidString(gender, "gender");
    // logStreak is set to 1 by default
    let logStreak = 1;
    let friends = [];

    const hashedPassword = await bcrypt.hash(password, 4);

    const userCollection = await users();
    const insertResult = await userCollection.insertOne({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      city,
      state,
      age,
      gender,
      logStreak,
      friends,
      workouts: [],
      dateCreated: helpers.generateDate(),
      lastLogin: helpers.generateDate(),
    });

    if (!insertResult.acknowledged || !insertResult.insertedId) {
      throw "Failed to insert user";
    }

    const newUser = await userCollection.findOne({
      _id: insertResult.insertedId,
    });
    if (!newUser) {
      throw "Error getting newly created user";
    }

    return { registered: true };
  },

  async getUserById(userId) {
    const userCollection = await users();
    // if(!ObjectId.isValid(userId)) throw `Does not exist`
    const searched = await userCollection.findOne({
      _id: new ObjectId(userId),
    });
    if (!searched) throw `No user with id ${userId} found.`;
    searched._id = searched._id.toString();
    return searched;
  },
  //get user by email
  async getUserByEmail(email) {
    email = helpers.isValidEmail(email);
    const userCollection = await users();
    const user = await userCollection.findOne({
      email: email,
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },
  async loginUser(email, password) {
    if (!helpers.isValidEmail(email) || !helpers.isValidPassword(password)) {
      throw new Error("Either the email or password format is invalid");
    }

    let userCollection = await users();

    // Find the user by email
    let user = await userCollection.findOne({
      email: new RegExp(`^${email}$`, "i"),
    });

    // Check if the user was found
    if (!user) {
      throw new Error("Either the email or password is invalid");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Either the email or password is invalid");
    }

    // Return user data, consider what is necessary for your application context
    return {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      city: user.city,
      state: user.state,
      age: user.age,
      gender: user.gender,
      logStreak: user.logStreak,
      workouts: user.workouts,
      friends: user.friends,
      dateCreated: user.dateCreated,
    };
  },

  async addFriend(userEmail, friendEmail) {
    userEmail = helpers.isValidEmail(userEmail);
    friendEmail = helpers.isValidEmail(friendEmail);

    let userCollection = await users();

    // Find the user by email
    let user = await userCollection.findOne({
      email: new RegExp(`^${userEmail}$`, "i"),
    });

    // Check if the user was found
    if (!user) {
      throw new Error("User not found");
    }

    let friend = await userCollection.findOne({
      email: new RegExp(`^${friendEmail}$`, "i"),
    });

    if (!friend) {
      throw new Error("Friend not found");
    }

    if (user.friends.includes(friendEmail)) {
      throw new Error("Friend already added");
    }

    user.friends.push(friendEmail);
    await userCollection.updateOne(
      { email: userEmail },
      { $set: { friends: user.friends } }
    );

    return { success: true };
  },

  async getAllUsers() {
    const userCollection = await users();
    const userList = await userCollection.find({}).toArray();

    if (!userList) {
      throw "Error: no users found";
    }

    return userList;
  },
  async createWorkout(
    title,
    amountOfWorkout,
    unitOfWorkout,
    duration,
    type,
    creatorEmail
  ) {
    // Validate input data
    title = helpers.isValidString(title, "title");
    amountOfWorkout = helpers.isValidInt(amountOfWorkout, "amountOfWorkout");
    unitOfWorkout = helpers.isValidString(unitOfWorkout, "unitOfWorkout");
    duration = helpers.isValidInt(duration, "duration");
    type = helpers.isValidString(type, "type");
    creatorEmail = helpers.isValidEmail(creatorEmail); // Assuming you have a function to validate email format

    const date = helpers.generateDate();
    const workoutObject = {
      title,
      amountOfWorkout,
      unitOfWorkout,
      duration,
      type,
      date,
    };

    // Retrieve user collection and user by email
    const userCollection = await users();
    const user = await userCollection.findOne({ email: creatorEmail });

    if (!user) {
      throw new Error("User not found with the given email");
    }

    // Update user document with new workout
    const updateInfo = await userCollection.updateOne(
      { _id: user._id },
      { $push: { workouts: workoutObject } }
    );

    if (updateInfo.modifiedCount === 0) {
      throw new Error("Could not add workout");
    }

    return workoutObject; // Optionally return the newly created workout object
  },

  async getAllWorkouts(id) {
    const user = await this.getUserById(id);
    const workoutList = user.workouts;
    return workoutList;
  },

  async getAllUserWorkouts() {
    const userCollection = await users();
    const userList = await userCollection.find({}).toArray();
    if (!userList) {
      throw "Error: no users found";
    }

    // Creating an array that will hold all the workouts of all users
    const allWorkouts = userList
      .map((user) => {
        // Optionally, you might want to include user information with each workout
        return user.workouts.map((workout) => {
          return {
            userId: user._id,
            userName: `${user.firstName} ${user.lastName}`,
            ...workout,
          };
        });
      })
      .flat(); // Use flat to flatten the array of arrays into a single array

    return allWorkouts;
  },

  // async updateWorkout(title, amountOfWorkout, unitOfWorkout, duration, type, id) {
  //   id = helpers.isValidObjectId(id);
  //   title = helpers.isValidString(title, "title");
  //   amountOfWorkout = helpers.isValidString(amountOfWorkout, "description");
  //   unitOfWorkout = helpers.isValidString(unitOfWorkout, "unitOfWorkout");
  //   duration = helpers.isValidInt(duration, "duration");
  //   type = helpers.isValidString(type, "type");

  //   const workoutCollection = await workouts();
  //   const updateInfo = await workoutCollection.updateOne(
  //     { _id: id },
  //     {
  //       $set: {
  //         title,
  //         amountOfWorkout,
  //         unitOfWorkout,
  //         duration,
  //         type,
  //       },
  //     }
  //   );

  //   if (updateInfo.modifiedCount === 0) {
  //     throw "Error: could not update workout";
  //   }

  //   return await this.getWorkoutById(id);
  // },
};

export default exports;
