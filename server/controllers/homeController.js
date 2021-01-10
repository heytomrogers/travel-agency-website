const Travels = require('../models/Travels');
const Testimonials = require('../models/Testimonials');


exports.homeInformation = async (req, res) => {
    const promises = [];
    promises.push( Travels.findAll({limit:3}) );
    promises.push( Testimonials.findAll({limit:3}) );

    // pass to promise
    const [travels, testimonials] = await Promise.all(promises);

    res.render('index', {
        pageTitle: 'Home',
        className: 'home',
        travels,
        testimonials
    })
};