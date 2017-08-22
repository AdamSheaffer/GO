const axios = require('axios');

function buildSeatGeekUrl(queryString) {
    return `${process.env.SEATGEEK_URI + queryString}&taxonomies.name=mlb&client_id=${process.env.SEATGEEK_ID}`;
}

function mapEvents(events) {
    return events.map(e => {
        const homeTeam = e.performers.find(p => p.home_team);
        const awayTeam = e.performers.find(p => p.away_team);
        return {
            venue: e.venue,
            id: e.id,
            short_title: e.short_title,
            title: e.title,
            stats: e.stats,
            url: e.url,
            performers: { homeTeam, awayTeam },
            datetime_local: e.datetime_local
        }
    });
}

exports.getEvents = async (req, res) => {
    const parkName = req.query.park;

    if (!parkName) return res.json({ success: false, message: 'You must provide a park name' });

    const url = buildSeatGeekUrl(`?venue.name=${parkName}`);
    const { data } = await axios.get(url);
    const events = mapEvents(data.events);
    return res.json({ success: true, meta: data.meta, events });
}

exports.getEventsInRadius = async (req, res) => {
    let ip;
    const { lon, lat, range, beginDate, endDate, maxPrice, minPrice, sortBy, page = 1 } = req.query;

    if (!beginDate || !endDate) {
        return res.json({ success: false, message: 'Begin and End Dates are required' });
    }

    // If no coords sent, try to guess location by IP
    if (!lon || !lat) ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    let queryString = `?datetime_utc.gte=${beginDate}&datetime_utc.lte=${endDate}&page=${page}`;

    if (!!range && range !== "0") {
        const locationQuery = lon && lat ? `lon=${lon}&lat=${lat}` : `geoip=${ip}`;
        queryString += `&${locationQuery}&range=${range}mi`;
    }

    if (!!maxPrice) {
        queryString += `&lowest_price.lte=${maxPrice}`;
    }

    if (!!minPrice) {
        queryString += `&highest_price.gte=${minPrice}`;
    }

    if (!!sortBy) {
        queryString += `&sort=${sortBy}`;
    }

    const url = buildSeatGeekUrl(queryString);
    const { data } = await axios.get(url);
    const events = mapEvents(data.events);

    return res.json({ success: true, meta: data.meta, events });
}

exports.getTicketsForPark = async (req, res) => {
    const park = req.params.park;
    if (!park) return res.json({ success: false, message: 'You must provide a park name' });

    const url = buildSeatGeekUrl(`?q=${park}`);
    const { data } = await axios(url);
    const events = mapEvents(data.events);

    return res.json({ success: true, meta: data.meta, events });
}