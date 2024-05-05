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
    //console.log("Rendered Profile Page")
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

    // Fetching friends list directly from the user data
    const friendsEmails = user.friends;
    // Map over the friendsEmails to fetch each friend's details
    const friendsPromises = friendsEmails.map((email) =>
      userData.getUserByEmail(email)
    );
    // Await all promises to resolve for friends' details
    const friendsDetails = await Promise.all(friendsPromises);
    //console.log("Rendered Users Page")
    res.render("user", {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      city: user.city,
      state: user.state,
      age: user.age,
      gender: user.gender,
      logStreak: user.logStreak,
      friends: friendsDetails,
      workouts: user.workouts,
      dateCreated: user.dateCreated,
      lastLogin: user.lastLogin,
      who: userID
    });
  } catch (error) {
    console.error("Failed to render the profile page: ", error);
    res.status(500).json({ message: "Error rendering the profile page." });
  }
});

router.post("/addFriend/:userID", ensureAuthenticated, async (req, res) => {
  try {
    console.log("Adding friend...");
    const userId = req.params.userID; // ID of the user to befriend
    const friendsUser = await userData.getUserById(userId); // Fetch the user to befriend
    const currentUser = req.session.user; // User session data

    // Check if the current user already has this user as a friend
    if (currentUser.friends.includes(userId)) {
      return res.status(409).json({ message: "Already friends." }); // Conflict status if already friends
    }

    // Assuming there's a function in userData to add a friend
    const added = await userData.addFriend(
      currentUser.email,
      friendsUser.email
    );
    console.log("Friend added:", added);

    if (added) {
      // Optionally update session data if necessary
      req.session.user.friends.push(userId);
      res.status(200).json({ message: "Friend added successfully" });
    } else {
      res.status(500).json({ message: "Failed to add friend" });
    }
  } catch (error) {
    console.error("Error adding friend:", error);
    res.status(500).json({ message: "Error processing your friend request." });
  }
});

export default router;
