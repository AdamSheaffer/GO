const Park = require('../models/Park');

exports.getParks = async (req, res) => {
    const parks = await Park.find();
    return res.json({ success: true, parks });
}

exports.getParkByTeam = async (req, res) => {
    const team = req.params.team;
    if (!team) {
        return res.json({ success: false, message: 'You must supply a team name' });
    }

    const park = await Park.findOne({ team });

    if (!park) {
        return res.json({ success: false, message: 'There is no park with that team' });
    }

    return res.json({ success: true, park });
}