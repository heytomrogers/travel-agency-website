const Testimonials = require('../models/Testimonials');

exports.testimonialMessages = async (req, res) => {
    const testimonials = await Testimonials.findAll()
    res.render('testimonials', {
        pageTitle: 'Testimonials',
        testimonials
    });
};

exports.testimonialSubmission = async (req, res) => {
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
        const testimonials = await Testimonials.findAll()
        res.render('testimonials', {
            pageTitle: 'Testimonials',
            errors,
            name,
            email,
            message,
            testimonials
        })
            
    } else {
        // save to database
        const result = await Testimonials.create({
            name,
            email,
            message
        })
        if(result) {
            res.redirect('/testimonials')
        } else {
            console.log('something went wrong')
        }
        
    }

};