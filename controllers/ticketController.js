const axios = require('axios');

function getTicketsByParkName(parkName) {
    const url = `${process.env.SEATGEEK_URI}?venue.name=${parkName}&client_id=${process.env.SEATGEEK_ID}`;
    return axios.get(url);
};

exports.getEvents = async (req, res) => {
    const parkName = req.query.park;
    const { data } = await getTicketsByParkName(parkName);
    const events = data.events.map(e => {
        return {
            venue: e.venue,
            id: e.id,
            short_title: e.short_title,
            title: e.title,
            stats: e.stats,
            url: e.url,
            performers: e.performers,
            datetime_local: e.datetime_local
        }
    });
    return res.json({ success: true, meta: data.meta, events });
}