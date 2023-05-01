require('dotenv').config()
console.log(process.env);
const express = require('express');
const router = express.Router();
const app = express();
const port = 3000;
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const sequelize = require('./db');

const viewsRouter = require('./routes/viewsRouter');

// Configure the views engine for express app.
nunjucks.configure('views', {
    autoescape:  true,
    express:  app
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

if(process.env !== undefined || null) {
    console.log(process.env)
    sequelize.sync();
    // Tell app to use a router
    app.use('/', viewsRouter);
}



app.listen(port, () => {
    return console.log('What up baby, we in express now')
})