//import express, express router as shown in lecture code
//import { createUser, loginUser } from "../data/users.js";
import express from "express";
const router = express.Router();
import helpers from "../helpers.js";

router.route("/").get(async (req, res) => {
  // not sure about this yet; depends how we do the middleware
});

router
  .route("/register")
  .get(async (req, res) => {
    // Only show the register page if the user is not authenticated
  })
  .post(async (req, res) => {
    // Extract and validate form data, then register user
  });

router
  .route("/login")
  .get(async (req, res) => {
    // Only show the login page if the user is not authenticated
  })
  .post(async (req, res) => {
    // Process login attempt
  });

router.route("/logout").get(async (req, res) => {
  // Destroy the session and redirect to login
});

export default router;
