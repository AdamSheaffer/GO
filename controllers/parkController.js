const Park = require('../models/Park');

exports.getParks = async (req, res) => {
    const parks = await Park.find();
    return res.json({ success: true, parks });
}