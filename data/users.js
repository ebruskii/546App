import helpers from '../helpers.js';
import { users } from '../config/mongoCollections.js';
import bcrypt from 'bcrypt';

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

    async loginUser(email, password) {
        email = helpers.isValidEmail(email);
        password = helpers.isValidPassword(password);

        // check for an existing user
        let userCollection = await users();
        let user = await userCollection.findOne({ username: new RegExp(`^${username}$`, 'i') });
        if (!user) {
            throw new Error('Either the username or password is invalid');
        }

        // check password to proivded password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error('Either the username or password is invalid');
        }

        return {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            city: user.city,
            state: user.state,
            age: user.age,
            gender: user.gender,
            logStreak: user.logStreak,
            dateCreated: user.dateCreated
        }

    },
};

export default exports;
