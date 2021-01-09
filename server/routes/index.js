const express = require('express');
const router =express.Router();

// import the models
const Travels = require('../models/Travels');
const Testimonials = require('../models/Testimonials');


module.exports = function() {

    // home page 
    router.get('/', (req, res) => {

        const promises = [];

        promises.push( Travels.findAll({limit:3}) );
        promises.push( Testimonials.findAll({limit:3}) );

        // pass to promise
        const result = Promise.all(promises);

        result.then((result) => res.render('index', {
            pageTitle: 'Home',
            className: 'home',
            travels: result[0],
            testimonials: result[1]
        }))
        .catch(err => console.log(err));
    });

    // about us
    router.get('/about', (req, res) => {
        res.render('about', {
            pageTitle: 'About Us'
        });
    });

    // upcoming travels
    router.get('/travels', (req, res) => {
        Travels.findAll()
        .then(travels => res.render('travels', {
            pageTitle: 'Upcoming Travels',
            travels 
        }));
    });

    // travel pages
    router.get('/travels/:id', (req, res) => {
        Travels.findByPk(req.params.id)
        .then(travel => res.render('travel', {
            travel
        }));
    });

    // testimonials
    router.get('/testimonials', (req, res) => {
        Testimonials.findAll()
        .then(testimonials => res.render('testimonials', {
            pageTitle: 'Testimonials',
            testimonials
        }));
    });

    // handles the form submission with POST
    router.post('/testimonials', (req, res) => {
        let {name, email, message} = req.body;

        // validate the form
        let errors = [];

        if(!name) {
            errors.push({'message':'Add your name'})
        }
        if(!email) {
            errors.push({'message':'Add your email'})
        }
        if(!message) {
            errors.push({'message':'Add your testimonial'})
        }

        // check if there're some errors
        if(errors.length > 0) {
            // if we have some errors display warning to the view
            Testimonials.findAll()
                .then(testimonials => res.render('testimonials', {
                    pageTitle: 'Testimonials',
                    errors,
                    name,
                    email,
                    message,
                    testimonials
                }));
        } else {
            // save to database
            Testimonials.create({
                name,
                email,
                message
            })
            .then(() => res.redirect('/testimonials'))
            .catch(error => console.log(error))
        }

    });

    return router;
}