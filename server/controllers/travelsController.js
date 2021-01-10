const Travels = require('../models/Travels');

exports.travelsInformation = async (req, res) => {
    const travels = await Travels.findAll()
    res.render('travels', {
        pageTitle: 'Upcoming Travels',
        travels 
    });
};

exports.travelInformation = async (req, res) => {
    const travel = await Travels.findByPk(req.params.id)
    res.render('travel', {travel});
};