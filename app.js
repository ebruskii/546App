import express from "express";
import session from "express-session";
import exphbs from "express-handlebars";
import configRoutes from "./routes/index.js";
import { Cookie } from "express-session";
import helpers from "./helpers.js";

const app = express();

// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serving static files
app.use(express.static("public"));

// Set up Handlebars
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", "./views");

// Set up session middleware
app.use(
  session({
    secret: "some secret string!",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }, // Change to true if using HTTPS
  })
);

// Configure routes
configRoutes(app);

// Server listening
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
