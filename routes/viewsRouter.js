const express = require('express');
const router = express.Router()
const createCtrl = require('../controllers/create-users');

    // Render for different views in your app. I need to create a way to generate user objects. 
    // I think I need to add schemas and allow for logging into app. 
    router.get('/', (req, res, next) => {   
        let context = {
            layout: 'base-layout.njk',
            mainContent: 'Yello world',
            mainContentDescription: 'HomePage',
            mainBtnHref: '/sign-up',
            mainBtnCta: 'Sign Up',
        }

        res.render('home-page.njk', context)
    })
    // Sign up to create users
    router.get('/sign-up', (req, res, next) => {
        let context = {
            layout: 'base-layout.njk',
            mainContent: 'Yello world',
            mainContentDescription: 'HomePage',
            mainBtnHref: '/sign-up',
            mainBtnCta: 'Sign Up',
        }

        res.render('sign-up.njk', context)
    })
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
        }
        
        res.status(201)
        res.redirect('/')
    })




module.exports = router;


