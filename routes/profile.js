import express from "express";
const router = express.Router();
import userData from "../data/users.js"; 
import achievements from "../data/achievements.js";

  const ensureAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        // If the user is not logged in, redirect to login page
        return res.redirect('/login');
    }
    next();
};


// GET route to display the profile information
//wooohoo
router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        const user = req.session.user; // Getting user info for display
        res.render('profile', { user });  // Render the profile page using the user info
    } catch (error) {
        console.error('Failed to render the profile page: ', error);
        res.status(500).render('error', { message: 'Error rendering the profile page.' });
    }
});

export default router;
