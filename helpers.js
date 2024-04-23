import { ObjectId } from "mongodb";

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
    if (!/[!@#$%^&*]/.test(password)) {
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
  getNextMonday() {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();
    const daysUntilNextMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
    const nextMonday = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + daysUntilNextMonday
    );
    const month = nextMonday.getMonth() + 1;
    const day = nextMonday.getDate();
    const year = nextMonday.getFullYear();
    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
  },
};

export default exports;
