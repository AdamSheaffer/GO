const axios = require('axios');

function buildSeatGeekUrl(queryString) {
    return `${process.env.SEATGEEK_URI + queryString}&taxonomies.name=mlb&client_id=${process.env.SEATGEEK_ID}`;
}

function mapEvents(events) {
    return events.map(e => {
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
}

exports.getEvents = async (req, res) => {
    const parkName = req.query.park;

    if (!parkName) return res.json({ success: false, message: 'You must provide a park name' });

    const url = buildSeatGeekUrl(`?venue.name=${parkName}`)
    const { data } = await axios.get(url);
    const events = mapEvents(data.events);
    return res.json({ success: true, meta: data.meta, events });
}

exports.getEventsInRadius = async (req, res) => {
    let ip;
    const { lon, lat, range = 50, beginDate, endDate } = req.query;

    // If no coords sent, try to guess location by IP
    if (!lon || !lat) ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const locationQuery = lon && lat ? `lon=${lon}&lat=${lat}` : `geoip=${ip}`;
    const queryString = `?${locationQuery}&range=${range}mi&datetime_utc.gte=${beginDate}&datetime_utc.lte=${endDate}`;
    const url = buildSeatGeekUrl(queryString);
    const { data } = await axios.get(url);
    const events = mapEvents(data.events);

    return res.json({ success: true, meta: data.meta, events });
}