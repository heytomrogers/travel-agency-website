const Testimonials = require('../models/Testimonials');

exports.testimonialMessages = (req, res) => {
    Testimonials.findAll()
    .then(testimonials => res.render('testimonials', {
        pageTitle: 'Testimonials',
        testimonials
    }));
};

exports.testimonialSubmission = (req, res) => {
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

};