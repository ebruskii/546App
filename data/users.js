import helpers from "../helpers.js";
import { users } from "../config/mongoCollections.js";
import bcrypt from "bcrypt";

const exports = {
  // create user
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
};

export default exports;
