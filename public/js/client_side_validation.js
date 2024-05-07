// import userData from '../../data/users.js'

// check string helper
  function isValidPassword(password) {
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
  }
  function isValidEmail(email) {
    email = this.isValidString(email, "email");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw `Error: ${email} is not a valid email address`;
    }
    return email;
  }
  function isValidString(str, varName) {
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
  }

  // check Intiger helper
  function isValidInt(int, varName) {
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
    return Number(int);
  }

let registerForm = document.getElementById("registerForm");
let error = document.getElementById("error");
registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    let email = document.getElementById("email").value;
    email = email.toLowerCase();
    let password = document.getElementById("password").value;
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let city = document.getElementById("city").value;
    let state = document.getElementById("state").value;
    let age = document.getElementById("age").value;
    let gender = document.getElementById("gender").value;
    try{
        email = isValidEmail(email, "email");
        password = isValidPassword(password, "password");
        firstName = isValidString(firstName, "firstName");
        lastName = isValidString(lastName, "lastName");
        city = isValidString(city, "city");
        state = isValidString(state, "state");
        age = isValidInt(age, "age");
        gender = isValidString(gender, "gender");
    //   if (userData.getUserByEmail(email)){
    //       throw new Error("Invalid email or password provided");
    //     }

      
    }catch(e){
        error.innerHTML = e;
        error.style.display = "block";
        return;
    }
    try {
        //use fetch for the response object below instead of axios 
        let response = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                city: city,
                state: state,
                age: age,
                gender: gender
            }),
        });
        
        if (response.status === 200) {
            window.location.href = "/login"; // Redirect on success
        } else {
            alert('Registration failed: ' + response.message); // Display the error message from server
        }
    } catch (error) {
        console.log(error);
    }
});
