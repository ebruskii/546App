import express from "express";
import challengesData from "../data/challenges.js";
import usersData from "../data/users.js";

const router = express.Router();

// const redirectIfAuthenticated = (req, res, next) => {
//     if (req.session.user) {
//       return res.redirect("/dashboard"); // Modify as needed
//     }
//     next();
//   };

router.get("/:ID", async (req, res) => {
    let ID = req.params.ID;
    let challenge = await challengesData.getChallengeByID(ID);
    if (!challenge) {
        return res.status(404).send("Challenge not found");
    }
    let currentUser = req.session.user;
    let users = await usersData.getAllUsers();
    let dictUsers = {};
    for(let i = 0; i < users.length; i++){
        let name = users[i].firstName + " " + users[i].lastName;
        dictUsers[name] = 0;
    }
    let workouts = users.workouts;
    let unit = challenge.unitOfWorkout;
    for(let i = 0; i < users.length; i++){
        for(let j = 0; j < users.workouts.length; j++){
            if(workouts[j].type == challenge.type){
                if(unit == workouts[j].unitOfWorkout){
                    dictUsers[users[i].firstName + " " + users[i].lastName] += workouts[j].amountOfWorkout;
                }else{
                    if(unit == "kilometers"){
                        dictUsers[users[i].firstName + " " + users[i].lastName] += (workouts[j].amountOfWorkout / 1000);
                    }else{
                        dictUsers[users[i].firstName + " " + users[i].lastName] += (workouts[j].amountOfWorkout * 1000);
                    }
                }
            }
        }
    }
    let sortedUsers = Object.keys(dictUsers).sort(function(a, b) {return dictUsers[b] - dictUsers[a]});
    let leaderboard = sortedUsers.slice(0, 10);
    let currentUserLeaderboard = dictUsers[currentUser.firstName + " " + currentUser.lastName];
    res.render("challenges", {leaderboard : leaderboard, 
        challenge : challenge, 
        dict: dictUsers, 
        currentUserLeaderboard : currentUserLeaderboard, 
        currUser : currentUser});
        //working on dict user and leaderboard on handlebars
    });