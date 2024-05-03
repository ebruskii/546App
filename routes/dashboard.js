import express from "express";
import xss from "xss";  // Importing XSS library to sanitize inputs
import challengesData from "../data/challenges.js";  // Importing the data layer for challenges
import usersData from "../data/users.js";  // Importing the data layer for users
import workoutsData from "../data/workouts.js";  // Importing the data layer for workouts
const router = express.Router();

// Middleware to ensure that only authenticated users can access the routes
const ensureAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        // If the user is not logged in, redirect to login page
        return res.redirect('/login');
    }
    next();
};

// GET route to display all challenges - acts as the dashboard
router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        const challenges = await challengesData.getAllChallenges(); // Fetching real data from the database
        const users = await usersData.getUserByEmail(req.session.user.email); // Fetching real data from the database
        const workoutTypes = await workoutsData.getAllWorkoutTypes(); // Fetching real data from the database
        res.render('dashboard', { challenges: challenges, workoutTypes: workoutTypes });  // Passing challenges data to the dashboard view
    } catch (error) {
        console.error('Failed to fetch challenges:', error);
        res.status(500).render('error', { message: 'Error retrieving challenges from the database.' });
    }
});

export default router;