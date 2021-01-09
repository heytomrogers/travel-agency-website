const express = require('express');
const router =express.Router();

// import the controllers
const homeController = require('../controllers/homeController');
const aboutController = require('../controllers/aboutController');
const travelsController = require('../controllers/travelsController');
const testimonialsController = require('../controllers/testimonialsController');

module.exports = function() {

    // home page 
    router.get('/', homeController.homeInformation);
    // about us
    router.get('/about', aboutController.aboutInformation);
    // upcoming travels
    router.get('/travels', travelsController.travelsInformation );
    // travel pages
    router.get('/travels/:id', travelsController.travelInformation);
    // testimonials
    router.get('/testimonials', testimonialsController.testimonialMessages);
    // handles the form submission with POST
    router.post('/testimonials', testimonialsController.testimonialSubmission);
    return router;
}