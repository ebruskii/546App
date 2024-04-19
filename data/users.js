import helpers from '../helpers.js';
import { users } from '../config/mongoCollections.js';

const exports = {
    // create user
    async createUser(email, password, firstName, lastName, city, state, age, gender) {
        email = helpers.isValidEmail(email);
        password = helpers.isValidPassword(password);
        firstName = helpers.isValidString(firstName, 'first name');
        lastName = helpers.isValidString(lastName, 'last name');
        city = helpers.isValidString(city, 'city');
        state = helpers.isValidState(state);
        age = helpers.isValidInt(age, 'age');
        if (age < 16 || age > 100) {
            throw 'Error: age must be between 16 and 100';
        }
        gender = helpers.isValidString(gender, 'gender');
        // logStreak is set to 1 by default
        let logStreak = 1;

        const userCollection = await users();
        const insertResult = await userCollection.insertOne({
            email,
            password,
            firstName,
            lastName,
            city,
            state,
            age,
            gender,
            logStreak,
            dateCreated: helpers.generateDate(),
            lastLogin: helpers.generateDate(),
        });

        if (!insertResult.acknowledged || !insertResult.insertedId) {
            throw 'Failed to insert user';
        }

        const newUser = await userCollection.findOne({ _id: insertResult.insertedId });
        if (!newUser) {
            throw 'Error getting newly created user';
        }

        return newUser._id.toString(); // Convert ObjectId to string and return
    },
};

export default exports;
