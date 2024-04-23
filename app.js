import express from "express";
const app = express();
import configRoutes from "./routes/index.js";
import exphbs from "express-handlebars";
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
import helpers from "./helpers.js";

// Set up Handlebars
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

configRoutes(app);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
