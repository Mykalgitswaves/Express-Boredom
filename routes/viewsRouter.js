const express = require('express');
const router = express.Router()
const createCtrl = require('../controllers/create-users');
const { sessionChecker } = require('../index')

    // Render for different views in your app. I need to create a way to generate user objects. 
    // I think I need to add schemas and allow for logging into app. 
    router.get('/', async (req, res, next) => {   
        // Should probably refactor this into a function for more dry code

        let loggedInUser = null;

        if(req.session.user) {
            loggedInUser = await createCtrl.getSessionUser(req.session.user);
        }

        let context = {
            layout: 'base-layout.njk',
            mainContent: 'Yello world',
            mainContentDescription: 'HomePage',
            mainBtnHref: '/sign-up',
            mainBtnCta: 'Sign Up',
            user: loggedInUser
        }

        res.render('home-page.njk', context)
    });

    // Sign up to create users
    router.get('/sign-up', async (req, res, next) => {
       

        let context = {
            layout: 'base-layout.njk',
            mainContent: 'Yello world',
            mainContentDescription: 'HomePage',
            mainBtnHref: '/sign-up',
            mainBtnCta: 'Sign Up',
        }

        res.render('sign-up.njk', context)
    });

    // This is where we can create users.
    router.post('/sign-up', (req, res) => {
        const formData = {
            name: req.body.fullname,
            username: req.body.username,
            password: req.body.password,
            YOE: req.body.YOE
        }
        console.log(formData)

        if(formData !== null){
            createCtrl.createUser(formData);
            res.status(201)
            res.redirect('/')
        }
    });

    router.post('/sign-in', async (req, res, next) => {
        const formData = {
            email: req.body.signInEmail,
            password: req.body.signInPassword
        }
        
        const user = await createCtrl.signIn(formData)
        if(user) {
            // Save user pk to session in order to get from different views
            req.session.user = user.email
            req.session.valid = true;
        } else {
            res.send('Invalid username or password');
        }
        res.redirect('/');
    });
    // Make a view that gets the
    // router.get('/sucess/home', async (req, res) => {
    //     const user = await browser.cookies.get('surfapp-user')
    //     if(user) {
    //         context = {
    //             layout: 'base-layout.njk',
    //             user: user.pk,
    //             YOE: user.YOE,
    //             mainContent: 'Yello world',
    //             mainContentDescription: 'HomePage',
    //             mainBtnHref: '/sign-up',
    //             mainBtnCta: 'Sign Up',
    //         }
    //         res.render('home-page.njk', context)
    //     }
    // })

module.exports = router;


