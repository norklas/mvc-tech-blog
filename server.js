// Require dependencies
const express = require("express");
const routes = require("./controllers");
const path = require("path");
const sequelize = require("./config/connection");

// Helpers
const helpers = require("./utils/helpers");

// Handlebars
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers });

// Session to connect to sequelize database
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3001;

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: "verysecret",
  cookie: { originalMaxAge: 600000 },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Handlebars as the default template engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Use routes
app.use(routes);

// Turn on connection to DB and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening!"));
});
