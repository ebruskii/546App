import {ObjectId} from 'mongodb';

const exports = {
    // check valid ID
    isValidId (id, varName) {
        if (!id) {
            throw `Error: ${varName} must be provided`;
        }
        if (typeof id !== 'string'){
            throw `Error: ${varName} must be a string`;
        }
        id = id.trim();
        if (id.length === 0) {
            throw `Error: ${varName} must not be empty`;
        }
            
        if (!ObjectId.isValid(id)){
            throw `Error: ${varName} is not a valid ID`;
        }
        return id;
    },

    // check string helper
    isValidString (str, varName){
        if (!str){
            throw `Error: ${varName} must be provided`;
        }
        if (typeof str !== 'string'){
            throw `Error: ${varName} must be a string`;
        }

        str = str.trim();
        if (str.length === 0){
            throw `Error: ${varName} must not be empty`;
        }
        if (!(isNaN(str))){
            throw `Error: ${varName} must not only contain numbers`;
        }

        return str;
    },

    // check Intiger helper
    isValidInt (int, varName) {
        if (!int){
            throw `Error: ${varName} must be provided`;
        }
        if (isNaN(int)){
            throw `Error: ${varName} must be a number`;
        }
        // none of our numbers should be negative
        if (int < 0){
            throw `Error: ${varName} must be greater than 0`;
        }
        return int;
    },

    // check valid state
    isValidState (state) {
        state = this.isValidString(state, 'state');

        const validStates = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 
        'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 
        'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 
        'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];

        if (!validStates.includes(state)) {
            throw `Error: ${state} is not a valid US state abbreviation`;
        }

        return state;
    },

    // check valid email
    isValidEmail (email) {
        email = this.isValidString(email, 'email');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw `Error: ${email} is not a valid email address`;
        }
        return email;
    },

    // check valid password
    isValidPassword (password) {
        password = this.isValidString(password, 'password');
        if (password.length < 6) {
            throw 'Error: password must be at least 6 characters long';
        }
        return password;
    },

    // generate the current date
    generateDate () {
        const currentDate = new Date();
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();
        const year = currentDate.getFullYear();
        const formattedDate = `${month}/${day}/${year}`;
        return formattedDate;
    },

};

export default exports;


