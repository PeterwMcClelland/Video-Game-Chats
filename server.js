/* ------------------------- */
/* Project  : Tech Blog      */
/* Team     : Dark Overlords */
/* File     : server.js      */
/* Date     : 05/13/2022     */
/* Modified : 05/13/2022     */
/* ------------------------- */
// Access to public files
const path = require('path');
// Access to express modules to route
const express = require('express');
// Access to routes in controllers folder
const routes = require('./controllers');
// Access to sequelize file to connect database mysql (using .env file to protect credentials)
const sequelize = require('./config/connection');
// Access to helpers functions (javascript validations for HTML)
const helpers = require('./utils/helpers');
// Assign express variable 
const app = express();
// Assign dinamic port (local and deployed by Heroku)
const PORT = process.env.PORT || 3001;
// Access to handlebars module
const exphbs = require('express-handlebars');
// Assign variable to handlebars and add helpers
const hbs = exphbs.create({ helpers });
// Access to session module
const session = require('express-session');
// Create model for session to connect to the backend
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// Create session model atributes
const sess = {
    secret: 'Video Games Chatrooms'
   ,cookie: {}
   ,resave: false
   ,saveUninitialized: true
   ,store: new SequelizeStore({
        db: sequelize
    })
};
// Initialize session
app.use(session(sess));
// Initialize handlebars engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// Initialize express and access to public folder for javascript logic and styles
app.use(express.static(path.join(__dirname, 'public')));
// Define express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Open routes
app.use(routes);
// Open server and database
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});