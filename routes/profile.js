import express from "express";
const router = express.Router();
import userData from "../data/users.js";
import achievements from "../data/achievements.js";

const ensureAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    // If the user is not logged in, redirect to login page
    return res.redirect("/login");
  }
  next();
};

// GET route to display the profile information
//wooohoo
router.get("/", ensureAuthenticated, async (req, res) => {
  try {
    const user = req.session.user; // Getting user info for display
    res.render("profile", { user }); // Render the profile page using the user info
  } catch (error) {
    console.error("Failed to render the profile page: ", error);
    res
      .status(500)
      .render("error", { message: "Error rendering the profile page." });
  }
});

router.get("/:userID", ensureAuthenticated, async (req, res) => {
  try {
    const userID = req.params.userID; // Extracting userID from the URL
    const user = await userData.getUserById(userID); // Fetch user by ID instead of email

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Assuming getAllUserWorkouts now requires a userID to fetch specific user workouts
    const allUserWorkouts = await userData.getAllUserWorkouts(userID);

    // Fetching friends list directly from the user data
    const friendsEmails = user.friends; // Assuming this still returns an array of friend emails
    // Map over the friendsEmails to fetch each friend's details
    const friendsPromises = friendsEmails.map(
      (email) => userData.getUserByEmail(email) // Assuming you have emails in the friends array
    );
    // Await all promises to resolve for friends' details
    const friendsDetails = await Promise.all(friendsPromises);

    res.render("user", {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      city: user.city,
      state: user.state,
      age: user.age,
      gender: user.gender,
      logStreak: user.logStreak,
      friends: friendsDetails, // Assuming this is an array of friend IDs or details
      workouts: allUserWorkouts,
      dateCreated: user.dateCreated,
      lastLogin: user.lastLogin,
    });
  } catch (error) {
    console.error("Failed to render the profile page: ", error);
    res.status(500).json({ message: "Error rendering the profile page." });
  }
});

export default router;
