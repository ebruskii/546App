// Purpose: to export all the routes to the server
import challengesRoutes from "./challenges.js";
import usersRoutes from "./users.js";
import workoutsRoutes from "./workouts.js";

const constructorMethod = (app) => {
  app.use("/", usersRoutes);
  app.use("/dashboard", challengesRoutes);

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

export default constructorMethod;
