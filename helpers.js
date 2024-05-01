import { ObjectId } from "mongodb";
import challengesData from "./data/challenges.js";

const exports = {
  // check valid ID
  isValidId(id, varName) {
    if (!id) {
      throw `Error: ${varName} must be provided`;
    }
    if (typeof id !== "string") {
      throw `Error: ${varName} must be a string`;
    }
    id = id.trim();
    if (id.length === 0) {
      throw `Error: ${varName} must not be empty`;
    }

    if (!ObjectId.isValid(id)) {
      throw `Error: ${varName} is not a valid ID`;
    }
    return id;
  },

  // check string helper
  isValidString(str, varName) {
    if (!str) {
      throw `Error: ${varName} must be provided`;
    }
    if (typeof str !== "string") {
      throw `Error: ${varName} must be a string`;
    }

    str = str.trim();
    if (str.length === 0) {
      throw `Error: ${varName} must not be empty`;
    }
    if (!isNaN(str)) {
      throw `Error: ${varName} must not only contain numbers`;
    }

    return str;
  },

  // check Intiger helper
  isValidInt(int, varName) {
    if (!int) {
      throw `Error: ${varName} must be provided`;
    }
    if (isNaN(int)) {
      throw `Error: ${varName} must be a number`;
    }
    // none of our numbers should be negative
    if (int < 0) {
      throw `Error: ${varName} must be greater than 0`;
    }
    return int;
  },

  // check valid state
  isValidState(state) {
    state = this.isValidString(state, "state");
    state = state.toUpperCase();

    const validStates = [
      "AL",
      "AK",
      "AZ",
      "AR",
      "CA",
      "CO",
      "CT",
      "DE",
      "FL",
      "GA",
      "HI",
      "ID",
      "IL",
      "IN",
      "IA",
      "KS",
      "KY",
      "LA",
      "ME",
      "MD",
      "MA",
      "MI",
      "MN",
      "MS",
      "MO",
      "MT",
      "NE",
      "NV",
      "NH",
      "NJ",
      "NM",
      "NY",
      "NC",
      "ND",
      "OH",
      "OK",
      "OR",
      "PA",
      "RI",
      "SC",
      "SD",
      "TN",
      "TX",
      "UT",
      "VT",
      "VA",
      "WA",
      "WV",
      "WI",
      "WY",
    ];

    if (!validStates.includes(state)) {
      throw `Error: ${state} is not a valid US state abbreviation`;
    }

    return state;
  },

  // check valid email
  isValidEmail(email) {
    email = this.isValidString(email, "email");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw `Error: ${email} is not a valid email address`;
    }
    return email;
  },

  // check valid password
  isValidPassword(password) {
    password = this.isValidString(password, "password", 8, 100);

    if (password.length < 8) {
      throw `Error: password must be at least 8 characters long`;
    }
    if (!/[A-Z]/.test(password)) {
      throw `Error: password must contain at least one uppercase character`;
    }
    if (!/[0-9]/.test(password)) {
      throw `Error: password must contain at least one number`;
    }
    if (!/[!@#$%^&*.]/.test(password)) {
      throw `Error: password must contain at least one special character`;
    }
    return password;
  },

  // generate the current date
  generateDate() {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
  },

  // get the next monday for the challenges
  getNextWeek() {
    const currentDate = new Date();
    const nextWeek = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 7
    );
    const month = nextWeek.getMonth() + 1;
    const day = nextWeek.getDate();
    const year = nextWeek.getFullYear();
    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
  },


  async startUp() {
    try {
      // Assuming getChallenges is a method that returns all existing challenges
      const existingChallenges = await challengesData.getAllChallenges();

      if (existingChallenges.length === 0) {
          // List of mock challenges to add
          const mockChallenges = [
              { title: "Run 5K", description: "Complete a 5K run", goal: "5000 meters", type: "Running", creator: "Admin" },
              { title: "Bike 10 Miles", description: "Go on a 10-mile bike ride", goal: "10 miles", type: "Biking", creator: "Admin" },
              { title: "Swim 1 Mile", description: "Swim a total of one mile", goal: "1 mile", type: "Swimming", creator: "Admin" }
          ];

          // Iterate over the mock challenges and create each one
          for (const challenge of mockChallenges) {
              await challengesData.createChallenge(challenge.title, challenge.description, challenge.goal, challenge.type, challenge.creator);
              console.log(`Challenge created: ${challenge.title}`);
          }
          console.log('All mock challenges have been added.');
      } else {
          console.log('Challenges already exist. No mock data added.');
      }
  } catch (error) {
      console.error('Failed to initialize mock challenges:', error);
  }

  },



};

export default exports;
