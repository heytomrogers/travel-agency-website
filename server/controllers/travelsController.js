const Travels = require('../models/Travels');

exports.travelsInformation = (req, res) => {
    Travels.findAll()
    .then(travels => res.render('travels', {
        pageTitle: 'Upcoming Travels',
        travels 
    }));
};

exports.travelInformation = (req, res) => {
    Travels.findByPk(req.params.id)
    .then(travel => res.render('travel', {
        travel
    }));
};