// Require dependencies
const express = require("express");
const path = require("path");
const sequelize = require("./config/connection");

// Session to connect to sequelize database
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Turn on connection to DB and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening!"));
});
