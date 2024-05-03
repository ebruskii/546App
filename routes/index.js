// Purpose: to export all the routes to the server
import dashboardRoutes from "./dashboard.js";
import usersRoutes from "./users.js";
import profileRoutes from "./profile.js";

const constructorMethod = (app) => {
  app.use("/", usersRoutes);
  app.use("/dashboard", dashboardRoutes);
  app.use("/profile", profileRoutes);
<<<<<<< HEAD

=======
  
>>>>>>> 554d496028f4baf54998f1e023980b6d297e224d
  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

export default constructorMethod;
