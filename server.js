// Basic MVC and package imports
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");

// Configuring sequelize + sequelizeStore
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Configuring the core application
const app = express();
const PORT = process.env.PORT || 3001;

// Configuring session
const sess = {
  secret: process.env.DB_SCRT,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 day in ms
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Actually applying session to app
app.use(session(sess));

// Configuring handlebars
const helpers = require("./utils/helpers");
const hbs = exphbs.create({ helpers });
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// General middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

// Actually start the app
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
