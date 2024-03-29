require("dotenv").config();
const express = require('express');
const exphbs = require('express-handlebars');
const allRoutes = require('./controllers');
const session = require("express-session")

const sequelize = require('./config/connection');

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sess = {
    secret: 'keyboard cat',
    cookie: {},
    resave:false,
    saveUninitialized:false
  }

  app.use(session(sess));

// Static directory
app.use(express.static('public'));

const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use('/',allRoutes);

sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
    });
});