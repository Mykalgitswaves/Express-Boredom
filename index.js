//–––––––––––––––––––––––––––––––––––––––––––
//––––––––––ImportsImportsImports––––––––––––
//–––––––––––––––––––––––––––––––––––––––––––


require('dotenv').config()
const express = require('express');
const router = express.Router();
const app = express();

const port = 3000;
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
// Sequelize is the name of our database.
const sequelize = require('./db');
const session = require('express-session');
const sessionStore = require('express-session-sequelize')(session.Store);
const cookieParser = require('cookie-parser')
const viewsRouter = require('./routes/viewsRouter');
// For styles and stuff
const path = require('path');
const postcssMiddleware = require('postcss-middleware');


//–––––––––––––––––––––––––––––––––––––––––––
//––––––––This is for the front end––––––––––
//–––––––––––––––––––––––––––––––––––––––––––
// Configure the views engine for express app.


app.set('views', path.join(__dirname, 'views'));


// Serve static files from the public directory

app.use(express.static(path.join(__dirname, 'public')))

// Compile css with Tailwind css and postcss

app.use('/css/main.css', postcssMiddleware({
    plugins: [],
    src: (req) => path.join(__dirname, 'public', 'css', 'main.css'),
    dest: (req) => path.join(__dirname, 'public', 'css', 'output.css'),
    options: {
      map: { inline: false },
      parser: false
    }
  }));


// Set Nunjucks as the template engine
// We should also consider which front end js 
// we might want to use for this? Probably vue¿


  nunjucks.configure('./views', {
    autoescape:  true,
    express:  app
  })

//–––––––––––––––––––––––––––––––––––––––––––
//–––––––––––––––––––––––––––––––––––––––––––


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//–––––––––––––––––––––––––––––––––––––––––––
//–––––This is for db stuff and nerdness–––––
//–––––––––––––––––––––––––––––––––––––––––––
//––––––––––––––Session Storage––––––––––––––


app.use(cookieParser());


// Save our sessions in a new db table that is more cash money

app.use(session({
    secret: process.env.SESSION_SECRET,
    store: new sessionStore({
        db: sequelize,
    }),
    resave: false,
    proxy: true,
    saveUninitialized: true,
    cookie: {
        secure: process.env.HTTPS === 'true',
        // This is nerd for like one day I think, idk ripped it from SO
        expires: new Date(Date.now() + 48 * 60 * 60 * 1000)
    }
}));


sequelize.sync()

// Not sure if I need this tbh.
module.exports = session;

//–––––––––––––––––––––––––––––––––––––––––––
//––––––––This is for express router–––––––––
//–––––––––––––––––––––––––––––––––––––––––––

// middleware for authenticating logged in users
// Thank you to jonathan Holloway @
// https://jonathan-holloway.medium.com/node-and-express-session-a23eb36a052
// This is used in our routes to either return something legit
// or bunk. UPDATE TOOK IT OUT NOT USED.


//–––––––––––––––––––––––––––––––––––––––––
//–––––––––––––––––––––––––––––––––––––––––


app.use('/', viewsRouter);


//–––––––––––––––––––––––––––––––––––––––––––
//––––––App is called @ port cashmoney–––––––
//–––––––––––––––––––––––––––––––––––––––––––



app.listen(port, () => {
    return console.log('What up baby, we in express now')
})