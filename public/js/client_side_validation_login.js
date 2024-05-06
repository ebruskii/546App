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

let loginForm = document.getElementById("loginForm");
let error = document.getElementById("error");
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    try{
        email = isValidEmail(email);
        password = isValidPassword(password); 
    }catch(e){
        error.innerHTML = "Incorrect Username or Password";
        error.style.display = "block";
        return;
    }
    try {
        let response = await fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        if (response.status === 200) {
            window.location.href = "/login"; // Redirect on success
        } else {
            alert('Login failed: ' + response.message); // Display the error message from server
        }
    } catch (error) {
      console.error("Incorrect Username or Password");
    }
});