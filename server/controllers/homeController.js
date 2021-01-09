const Travels = require('../models/Travels');
const Testimonials = require('../models/Testimonials');


exports.homeInformation = (req, res) => {

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
};