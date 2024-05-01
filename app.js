import express from "express";
import session from "express-session";
import exphbs from "express-handlebars";
import configRoutes from "./routes/index.js";
import cookieParser from "cookie-parser";
import helpers from "./helpers.js";
// lol master fuck idk shit
const app = express();
app.use(cookieParser());

// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serving static files
app.use(express.static("public"));

// Set up session middleware
app.use(session({
    name: "AuthCookie",
    secret: "cookieMonster",
    resave: false,
    saveUninitialized: false,
  })
);

// Set up Handlebars
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", "./views");

// Configure routes
configRoutes(app);

// Server listening
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
