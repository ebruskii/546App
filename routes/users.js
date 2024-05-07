//import express, express router as shown in lecture code
//import { createUser, loginUser } from "../data/users.js";
import express from "express";
import userData from "../data/users.js"; // Import your user management functions
import helpers from "../helpers.js";
import xss from "xss"; // Import XSS protection module

const router = express.Router();

// Middleware to check if user is logged in
const redirectIfAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/dashboard"); // Modify as needed
  }
  next();
};

router.route("/").get((req, res) => {
  res.redirect("/login"); // Redirect root to login if not logged in
});

router
  .route("/register")
  .get(redirectIfAuthenticated, async (req, res) => {
    // Only show the register page if the user is not authenticated
    res.render("register");
  })
  .post(redirectIfAuthenticated, async (req, res) => {
    // Extract and validate form data, then register user
    const { email, password, firstName, lastName, city, state, age, gender } =
      req.body;
    const sanitizedEmail = xss(email);
    const sanitizedPassword = xss(password);
    const sanitizedFirstName = xss(firstName);
    const sanitizedLastName = xss(lastName);
    const sanitizedCity = xss(city);
    const sanitizedState = xss(state);
    const sanitizedAge = xss(age);
    const sanitizedGender = xss(gender);
    if(userData.getUserByEmail(sanitizedEmail) == null){
      throw new Error("User already exists");
    }
    try {
      const result = await userData.createUser(
        sanitizedEmail,
        sanitizedPassword,
        sanitizedFirstName,
        sanitizedLastName,
        sanitizedCity,
        sanitizedState,
        sanitizedAge,
        sanitizedGender
      );
      if (result.registered){
        res.status(200).json({ success: true, redirect: "/login" });
      } else {
        res.status(400).json({
          success: false,
          message: "Failed to register user",
        });
      }
      
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Failed to register user: " + error.message,
      });
    }
  });

router
  .route("/login")
  .get(redirectIfAuthenticated, async (req, res) => {
    res.render("login");
  })
  .post(redirectIfAuthenticated, async (req, res) => {
    const { email, password } = req.body;
    const sanitizedEmail = xss(email);
    const sanitizedPassword = xss(password);

    try {
      const user = await userData.loginUser(sanitizedEmail, sanitizedPassword);
      if (user) {
        req.session.user = user;
        res.status(200).json({ success: true, redirect: "/dashboard" });
      } else {
        res.status(401).render("login", { error: "Invalid email or password" });
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      res
        .status(500)
        .render("login", { error: "Login failed: " + error.message });
    }
  });

router.route("/logout").get(async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login"); // Redirect to login after session is destroyed
  });
});

export default router;
