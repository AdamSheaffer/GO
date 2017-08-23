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

    const [park] = await Park.aggregate([
        {
            $match: { team }
        },
        {
            $lookup: {
                from: 'trips',
                localField: '_id',
                foreignField: 'park',
                as: 'trips'
            }
        },
        {
            $project: {
                name: 1,
                team: 1,
                parkCity: 1,
                teamCity: 1,
                division: 1,
                location: 1,
                avgRating: { $avg: '$trips.rating' },
                photos: '$trips.photos'
            }
        }
    ]);

    if (!park) {
        return res.json({ success: false, message: 'There is no park with that team' });
    }

    // Todo: Can these be flattened in the query?
    park.photos = [].concat(...park.photos);

    return res.json({ success: true, park });
}