const express = require('express');
const router = express.Router()
const createCtrl = require('../controllers/create-users');
const bcrypt = require("bcrypt");
const sequelize = require('../db');
const saltRounds = 10;
const session = require('../index');
const util = require("util");
// Home page
// 

router.get('/', async (req, res, next) => {   
    let loggedInUser = null;
    if(req.session.user) {
        loggedInUser = await createCtrl.getSessionUser(req.session.user);
    }
    // Context sends page data, might be from users, probs don't need all the
    // button text here can leave in app.
    let context = {
        mainContent: 'Yello world',
        mainContentDescription: 'HomePage',
        mainBtnHref: '/sign-up',
        mainBtnCta: 'Sign Up',
        user: loggedInUser
    }
    res.render('home-page.njk', context)
});


// Sign up where we can create users
// 

router.get('/sign-up', async (req, res, next) => {
    let context = {
        mainContent: 'Yello world',
        mainContentDescription: 'HomePage',
        mainBtnHref: '/sign-up',
        mainBtnCta: 'Sign Up',
    }

    res.render('sign-up.njk', context)
});


// This is where we can create users.
// 

router.post('/sign-up', async (req, res) => {
    const formData = {
        name: req.body.fullname,
        username: req.body.username,
        password:  await createCtrl.encryptPassword(req.body.password),
        YOE: req.body.YOE
    }

    // Check to make sure promise is fufilled before redirecting I think. 
    if(formData !== null && util.inspect(formData.password).includes("pending") === false) {
        createCtrl.createUser(formData);
        res.status(201)
        res.redirect('/')
    }
});


// Sign in router, sets session.
// 

router.post('/sign-in', async (req, res, next) => {
    const formData = {
        email: req.body.signInEmail,
        password: req.body.signInPassword
    }
    
   const user = await createCtrl.signIn(formData);

   if(user) {
        console.log(user)
         // Save user pk to session in order to get from different views
         req.session.user = user.email
         req.session.valid = true;
         res.redirect('/');   
    } else {
        console.log('something broke');
        res.send('Invalid username or password');
    }
});

// Log out functionality.
// 

router.get('/logout', async (req, res) => {
    // #TODO: Figure out how to delete session from DataBbase.
    req.session.destroy(() => {
        res.redirect('/');
    })
})

module.exports = router;


