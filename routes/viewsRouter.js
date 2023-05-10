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
        // log in redirect to profile of user from home page. 
        res.status(201)
        
        loggedInUser = await createCtrl.getSessionUser(req.session.user);
        // Get user
        if(loggedInUser) {
            req.params.uuid = user.UUID;
            res.redirect('/profile/:uuid')
        }
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
   console.log(user)
   if(user && user.UUID !== null) {
        console.log(user)
         // Save user pk to session in order to get from different views
         req.session.user = user.email
         req.session.valid = true;
        
         req.params.uuid = user.UUID;

         const { uuid } = req.params;
         
         res.redirect(`/profile/${uuid}`);   
    } else {
        console.log('something broke');
        res.send('Invalid username or password');
    }
});

router.get('/profile/:uuid', async(req, res, next) => {
    context = null;
    const { uuid } = req.params;
    user = await createCtrl.getQueryUser(uuid);
    
    if(user) {
        console.log('this should be working', user.dataValues)
        res.render('profile-page.njk', user.dataValues)
    }
})

// Log out functionality.
// 

router.get('/logout', async (req, res) => {
    // #TODO: Figure out how to delete session from DataBbase.
    req.session.destroy(() => {
        res.redirect('/');
    })
})

module.exports = router;


