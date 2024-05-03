// Purpose: to export all the routes to the server
import dashboardRoutes from "./dashboard.js";
import usersRoutes from "./users.js";
import workoutsRoutes from "./workouts.js";

const constructorMethod = (app) => {
  app.use("/", usersRoutes);
  app.use("/dashboard", dashboardRoutes);

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

export default constructorMethod;
