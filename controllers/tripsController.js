const Trip = require('../models/Trip');

exports.postNewTrip = async (req, res) => {
    req.body.user = req.user._id;
    const trip = await (new Trip(req.body)).save();
    return res.json({ success: true, message: 'Trip Saved!', trip });
}