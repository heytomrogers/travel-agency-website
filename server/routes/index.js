const express = require('express');
const router =express.Router();

// import the controllers
const homeController = require('../controllers/homeController');
const aboutController = require('../controllers/aboutController');
const travelsController = require('../controllers/travelsController');
const testimonialsController = require('../controllers/testimonialsController');

module.exports = function() {
    router.get('/', homeController.homeInformation);
    router.get('/about', aboutController.aboutInformation);
    router.get('/travels', travelsController.travelsInformation );
    router.get('/travels/:id', travelsController.travelInformation);
    router.get('/testimonials', testimonialsController.testimonialMessages);
    router.post('/testimonials', testimonialsController.testimonialSubmission);
    return router;
}